import db from "@/libs/db";
import { verifyJwtToken, verifyToken } from "@/libs/jwt";
import Blog from "@/models/Blog";

export async function GET(req) {
  await db.connect();

  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId");
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {
  await db.connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    const newBlog = await Blog.create(body);

    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    console.log("***** error block *****");
    console.log(error);
    return new Response(error, { status: 500 });
  }
}

// **********************  self *******************************
// import db from "@/libs/db";
// import { veriftToken, verifyJwtToken } from "@/libs/jwt";
// import Blog from "@/models/Blog";

// export async function GET(req) {
//   await db.connect();
//   try {
//     const blogs = await Blog.find({}).limit(16).populate("authorId");
//     return new Response(JSON.stringify(blogs), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify(null), { status: 500 });
//   }
// }

// export async function POST(req) {
//   await db.connect();

//   // in node.js  -->  req.headers.authorization
//   const accessToken = req.headers.get("authorization");

//   // [Bearer , tokenfdjfkjfkdjppeksdsjhdusuweyu]
//   const token = accessToken.split(" ")[1];
//   const decodedToken = verifyJwtToken(token);
//   if (!accessToken || !decodedToken) {
//     return new Response(
//       JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
//       { status: 403 }
//     );
//   }

//   try {
//     const body = await req.json();
//     const newBlog = await Blog.create(body);
//     console.log("newBlogo= ", newBlog);
//     return new Response(JSON.stringify(newBlog), { status: 201 });
//   } catch (error) {
//     return new Response(error.message, { status: 501 });
//   }
// }
