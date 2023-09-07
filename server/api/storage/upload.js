import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image Not Found",
    });
  }
  const filename = files[0].filename;
  const filedata = files[0].data;
  console.log("uploading to supabase, filename: " + filename + ", data: ");
  const { data, error } = await supabase.storage
    .from("applications")
    .upload(filename, filedata, {
      cacheControl: "3600",
      upsert: true,
    });
  if (data) {
    console.log("upload successfull to supabase : " + data.path);
    return data.path;
  } else {
    console.log("some error occured : " + error.message);
    return error.message;
  }

  // for (let i = 0; i < files.length; i++) {
  //   if (files[i].name === "file") {
  //   }
  // }
});
