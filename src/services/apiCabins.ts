import { Cabin, InputsCabin } from "../types";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(
  newCabin: InputsCabin,
  id?: number | undefined
) {
  let imageName = ""; // Initialize imageName to an empty string
  let imagePath: string;

  if (typeof newCabin.image === "string") {
    imagePath = newCabin.image;
  } else {
    imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
      "/",
      ""
    );

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  console.log({ ...newCabin, image: imagePath });

  // Create/Edit cabin
  const query = supabase.from("cabins");

  // A) CREATE
  if (!id) await query.insert({ ...newCabin, image: imagePath });

  // B) EDIT
  if (id) {
    await query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().limit(1).single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // Delete image
  if (data !== null && typeof newCabin.image === "object") {
    // Explicitly assert the type of 'data' to 'Cabin'
    // Upload image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image[0]);
    const cabinData = data as Cabin;
    // Explicitly assert the type of 'storageError' to 'Error'

    if (storageError) {
      // handle error
      await supabase.from("cabins").delete().eq("id", cabinData.id);
      console.error(error);
      throw new Error(
        "Cabins image could not be uploaded, and cabin was not created!"
      );
    }
  } else {
    console.error("Data is null. Unable to proceed with the deletion.");
  }

  return data;
}

export async function deleteCabins(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
