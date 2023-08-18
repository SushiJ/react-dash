import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class User extends TimeStamps {
  @prop({ required: true, min: 2, max: 100 })
  public name!: string;

  @prop({ required: true, min: 50, max: 100, unique: true })
  public email!: string;

  @prop({ required: true, min: 5 })
  public password!: string;

  @prop()
  public city?: string;

  @prop()
  public state?: string;

  @prop()
  public country?: string;

  @prop()
  public occupation?: string;

  @prop()
  public phoneNumber?: string;

  @prop()
  public transactions?: Array<string>;

  @prop({ enum: ["user", "admin", "superadmin"], default: "admin" })
  public role?: string;
}

export const userModel = getModelForClass(User);
