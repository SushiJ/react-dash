import { userModel } from "../models/User";
import { dataUser } from "../../sample";

type User = {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
};

async function saveUser(user: User) {
  await userModel.findOneAndUpdate(
    {
      email: user.email,
    },
    user,
    {
      upsert: true,
    }
  );
}

async function findUser(filter: any) {
  return userModel.findOne(filter);
}

export async function upsertData() {
  const firstUser = await findUser({
    email: "kranstead0@narod.ru",
  });

  if (firstUser) {
    console.log("User Data already exists");
  } else {
    console.info("UPSERTING DATA");
    await populateUser();
  }
}

async function populateUser() {
  for (let userData of dataUser) {
    const user = {
      name: userData["name"],
      email: userData["email"],
      password: userData["password"],
      city: userData["city"],
      state: userData["state"],
      country: userData["country"],
      occupation: userData["occupation"],
      phoneNumber: userData["phoneNumber"],
      transactions: userData["transactions"],
      role: userData["role"],
    };
    await saveUser(user);
  }
}
