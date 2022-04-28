const graphql = require('graphql')
const mongoose = require("mongoose")
const { UserModel, SegmentModel, BlogModel, CommentModel } = require("./model")

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLID,
} = graphql;


// import { GraphQL } from 'graphql';

const ObjectId = require("mongodb").ObjectId;

const SegmentInput = new GraphQLInputObjectType({
    name: 'segmentInput',
    fields: {
        id: { type: GraphQLString },
        context: { type: GraphQLString },
        sequence: {type: GraphQLInt },
    }
})

const Comment = new GraphQLObjectType({
    name: 'comment',
    fields: {
        id: { type: GraphQLString },
        segmentId: { type: GraphQLString },
        commentOwnerUsername: { type: GraphQLString },
        context: { type: GraphQLString },
        commentDate: { type: GraphQLString }
    }
})

const Segment = new GraphQLObjectType({
    name: 'segment',
    fields: {
        id: { type: GraphQLString },
        blogId: { type: GraphQLString },
        username: { type: GraphQLString },
        context: { type: GraphQLString },
        sequence: { type: GraphQLInt },
    }
})

const Blog = new GraphQLObjectType({
    name: 'blog',
    fields: {
        id: { type: GraphQLString },
        segments: { type: GraphQLList(Segment) },
        username: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        publishDate: { type: GraphQLString },
    }
})

const User = new GraphQLObjectType({
    name: 'user',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        blogs: { type: GraphQLList(Blog) },
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        // User
        checkPassword: {
            type: GraphQLBoolean,
            args: { 
                name: { type: GraphQLString }, 
                pwInput: { type: GraphQLString } 
            },
            async resolve(parent, args) {
                var password = "";
                await UserModel.find({ username: args.name }).then(result => {
                    if (result.length === 1)
                        password = result[0].password;
                });
                return args.pwInput === password;
            }
        },

        findUserByUsername: {
            type: User,
            args: { username: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var user = null
                await UserModel.find({ username: args.username }).then(result => {
                    if (result.length == 1) {
                        user = result[0]
                    }
                })
                return user
            }
        },

        // Segment
        findSegmentsByBlogId: {
            type: GraphQLList(Segment),
            args: { blogId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var ret = await SegmentModel.find({blogId: args.blogId}).lean();
                ret.forEach(obj => {
                    obj.id = obj._id.toString()
                    return obj
                })
                return ret
            }
        },

        // Blog
        findAllBlogsByUserName: {
            type: new GraphQLList(Blog),
            args: { username: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var ret = await BlogModel.find({username: args.username}).lean();
                for(var i=0;i<ret.length;i++){
                    ret[i].id = ret[i]._id.toString()
                }
                return ret
            }
        },

        findBlogsByType: {
            type: new GraphQLList(Blog),
            args: { blogType: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var ret = await BlogModel.find({type: args.blogType}).lean();
                for(var i=0;i<ret.length;i++){
                    ret[i].id = ret[i]._id.toString()
                }
                return ret
            }
        },

        findBlogById: {
            type: Blog,
            args: { blogId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var ret = await BlogModel.findOne({_id: mongoose.Types.ObjectId(args.blogId)}).lean();
                ret._id = ret._id.toString()
                return ret
            }
        },

        findBlogsByKeyword: {
            type: new GraphQLList(Blog),
            args: { keyword: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
            }
        },

        // Comment
        findCommentsBySegmentId: {
            type: new GraphQLList(Comment),
            args: { segmentId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                var ret = await CommentModel.find({segmentId: args.segmentId}).lean();
                for(var i=0;i<ret.length;i++){
                    ret[i].id = ret[i]._id.toString()
                }
                return ret
            }
        },
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        // User
        addUser: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    args = { ...args, blogs: [] }
                    await UserModel.create(args).then(result => null)
                    return true
                } catch (error) {
                    console.log(error)
                    return false
                }
            }
        },

        updatePassword: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                newPassword: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    await UserModel.updateOne({ username: args.username }, { password: args.newPassword })
                    return true
                } catch (e) {
                    console.log(e)
                    return false
                }
            }
        },

        updateEmail: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                newEmail: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    await UserModel.updateOne({ username: args.username }, { email: args.newEmail })
                    return true
                } catch (e) {
                    console.log(e)
                    return false
                }
            }
        },

        updatePhone: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                newPhone: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    await UserModel.updateOne({ username: args.username }, { phone: args.newPhone })
                    return true
                }catch(error){
                    console.log(error)
                    return false
                }
            }
        },

        deleteUser: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try {
                    await UserModel.deleteOne({ username: args.username })
                    return true
                } catch (e) {
                    console.log(e)
                    return false
                }
            }
        },

        // Segment
        addSegment: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                blogId: { type: GraphQLNonNull(GraphQLString) },
                context: { type: GraphQLNonNull(GraphQLString) },
                sequence: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                try{
                    SegmentModel.create(args).then(result => null)
                    return true
                }catch(error){
                    console.log(error)
                    return false
                }
            }
        },

        deleteSegment: {
            type: GraphQLBoolean,
            args: {
                segmentId: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        updateSegment: {
            type: Segment,
            args: {
                segmentId: { type: GraphQLNonNull(GraphQLString) },
                segmentContext: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        // Blog
        addBlog: {
            type: GraphQLString,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try{
                    var curDate = new Date();
                    var mins = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
                    var curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + "/" + curDate.getDate() + " " + curDate.getHours() + ":" + mins;
                    var ret = null
                    args = {...args, segments: [], publishDate: curTime};
                    await BlogModel.create(args).then(result => {ret = result._id + ""});
                    return ret
                }catch(error){
                    console.log(error)
                    return null
                }
            }
        },

        deleteBlog: {
            type: GraphQLBoolean,
            args: {
                blogId: { type: GraphQLList(SegmentInput) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        updateBlogTitle: {
            type: Blog,
            args: {
                blogId: { type: GraphQLNonNull(GraphQLString) },
                newTitle: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        updateBlogType: {
            type: Blog,
            args: {
                blogId: { type: GraphQLNonNull(GraphQLString) },
                newType: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        // Comment
        addComment: {
            type: GraphQLString,
            args: {
                commentOwnerUsername: { type: GraphQLNonNull(GraphQLString) },
                segmentId: { type: GraphQLNonNull(GraphQLString) },
                context: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                try{
                    var curDate = new Date();
                    var mins = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
                    var curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + "/" + curDate.getDate() + " " + curDate.getHours() + ":" + mins;
                    var ret = null
                    args = {...args, segments: [], commentDate: curTime};
                    await CommentModel.create(args).then(result => {ret = result._id + ""});
                    return ret
                }catch(error){
                    console.log(error)
                    return null
                }
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})