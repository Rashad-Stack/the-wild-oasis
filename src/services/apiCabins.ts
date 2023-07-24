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

export async function createCabin(newCabin: InputsCabin) {
  const imageName: string = `${Math.random()}-${
    newCabin.image[0].name
  }`.replaceAll("/", "");
  const imagePath: string = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  // Delete image
  if (data !== null) {
    // Explicitly assert the type of 'data' to 'Cabin'
    const cabinData = data as Cabin[];
    // Explicitly assert the type of 'storageError' to 'Error'
    if (storageError) {
      // handle error
      await supabase.from("cabins").delete().eq("id", cabinData[0].id);
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
