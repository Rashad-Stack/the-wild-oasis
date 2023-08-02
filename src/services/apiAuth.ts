import supabase, { supabaseUrl } from "./supabase";

export async function signup(
  fullName: string,
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

type UpdateCurrentUser = {
  fullName: string;
  password: string;
  avatar: File | null;
};
export async function updateUser({
  fullName,
  password,
  avatar,
}: Partial<UpdateCurrentUser>) {
  // 1) Update password or Full name
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2) Upload the avatar image
  const filename = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(filename, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3) Update avatar in the user
  const { data: user, error: userError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`,
    },
  });
  if (userError) throw new Error(userError.message);

  return user;
}
