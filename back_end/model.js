const { ListCollectionsCursor } = require('mongodb')
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: ObjectId,
    username: String,
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

const UserModel = mongoose.model('users', UserSchema)
const SegmentModel = mongoose.model('segments', SegmentSchema)
const BlogModel = mongoose.model('blogs', BlogSchema)

module.exports={
    UserModel,
    SegmentModel,
    BlogModel,
};