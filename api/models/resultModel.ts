import { Schema, model } from "mongoose";

const findingSchema = new Schema({
    type: {
        type:String,
    },
    ruleId: {
        type: String, 
    },
    location: {
        path: {
            type: String,
        },
        positions: {
            begin:{
                line: {
                    type: Number
                }
            }
        }
    },
    metadata: {
        description: {
            type: String,
        },
        severity: {
            type: String
        }
    }
})

const resultSchema = new Schema({
    status: {
        type:String,
        required: [true, "Status is required"],
        enum: {
            values: ["Queued", "In Progress", "Success", "Failure"],
            message: "Status must be Queued/In Progress/Success/Failure"
        }
    },
    repositoryName: {
        type: String,
        required:[true, "Reposity name is required"]
    },
    findings: {
        type: [findingSchema],
    },
    queuedAt: {
       type: Date,
    },
    scanningAt: {
      type: Date,
    },
    finishedAt: {
      type: Date
    }
})

const Result = model("Result", resultSchema)
export default Result;