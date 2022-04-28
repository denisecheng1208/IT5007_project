const { ListCollectionsCursor } = require('mongodb')
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId
let Number = mongoose.Schema.Types.Number
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    phone: String,
    email: String,
    blogs: [{
        blogId:{
            type: ObjectId,
            ref: 'blog',
        }
    }],
})

const SegmentSchema = new Schema({
    id: ObjectId,
    blogId: ObjectId,
    username: String,
    context: String,
    sequence: Number,
})

const BlogSchema = new Schema({
    id: ObjectId,
    segments: [{
        segmentId:{
            type: ObjectId,
            ref: 'segment',
        }
    }],
    username: String,
    title: String,
    type: String,
    publishDate: String
})

const CommentSchema = new Schema({
    id: ObjectId,
    segmentId: String,
    blogOwenerUsername: String,
    commentOwenerUsername: String,
    context: String,
    commentDate: String,
})

const UserModel = mongoose.model('users', UserSchema)
const SegmentModel = mongoose.model('segments', SegmentSchema)
const BlogModel = mongoose.model('blogs', BlogSchema)
const CommentModel = mongoose.model('comments', CommentSchema)

module.exports={
    UserModel,
    SegmentModel,
    BlogModel,
    CommentModel,
};