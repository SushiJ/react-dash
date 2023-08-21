import {
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

// TODO: I think i'd have to make a model for transactions we'll see

class Transactions {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public cost!: number;

  @prop({ required: true })
  public products!: Array<string>;
}

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
})
class User extends TimeStamps {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true, minlength: 2, maxlength: 100 })
  public name!: string;

  @prop({ required: true, minlength: 50, maxlength: 100, unique: true })
  public email!: string;

  @prop({ required: true, minlength: 5 })
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
  public transactions?: [Transactions];

  @prop({ enum: ["user", "admin", "superadmin"], default: "admin" })
  public role?: string;
}

export const userModel = getModelForClass(User);
