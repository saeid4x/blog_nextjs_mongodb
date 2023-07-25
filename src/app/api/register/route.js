import db from "@/libs/db";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req) {
  try {
    await db.connect();
    const { username, email, password: pass } = await req.json();
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already Exist");
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // _doc => the value of the user
    const { password, ...user } = newUser._doc;

    //The JSON.stringify() static method converts a JavaScript value to a JSON string
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
