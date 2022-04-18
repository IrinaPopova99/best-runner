import mongoose from "mongoose";

class MongoDB {
  private readonly dbUri: string;

  constructor(uri?: string) {
    this.dbUri = "mongodb+srv://bestrunner:567328IkItParis@bestrunnercluster.nvz3x.mongodb.net/bestrunner?retryWrites=true&w=majority";
  }

  public connect(): Promise<mongoose.Mongoose> {
    return mongoose.connect(this.dbUri);
  }

  public disconnect(): Promise<void> {
    return mongoose.disconnect();
  }
}

export default MongoDB;
