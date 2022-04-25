const graphql = require('graphql')
const mongoose = require("mongoose")
const { UserModel, SegmentModel, BlogModel } = require("./model")

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = graphql;


// import { GraphQL } from 'graphql';

const ObjectId = require("mongodb").ObjectId;

const SegmentInput = new GraphQLInputObjectType({
    name: 'segmentInput',
    fields: {
        id: { type: GraphQLString },
        context: { type: GraphQLString },
    }
})

const Segment = new GraphQLObjectType({
    name: 'segment',
    fields: {
        id: { type: GraphQLString },
        blogId: { type: GraphQLString },
        username: { type: GraphQLString },
        context: { type: GraphQLString },
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
        publishDate: { type: GraphQLString  },
    }
})

const User = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLString },
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
                await UserModel.find({username: args.name}).then(result => {
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
                return await UserModel.findOne({username: args.username});
            }
        },

        // Segment
        findSegmentsByBlogId: {
            type: GraphQLList(Segment),
            args: { blogId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                return await SegmentModel.find({blogId: args.blogId});
            }
        },

        // Blog
        findAllBlogsByUserName: {
            type: new GraphQLList(Blog),
            args: { username: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                return await BlogModel.find({username: args.username});
            }
        },

        findBlogsByKeyword: {
            type: new GraphQLList(Blog),
            args: { keyword: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
            }
        }
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
            resolve(parent, args) {
                try{
                    args = {...args, blogs: []}
                    UserModel.create(args).then(result => null)
                    return true
                }catch(error){
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
            resolve(parent, args) {
                try{
                    UserModel.updateOne({username: args.username}, {$set:{password: args.newPassword}}).then(result => null)
                    return true
                }catch(error){
                    console.log(error)
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
            resolve(parent, args) {
                try{
                    UserModel.updateOne({username: args.username}, {$set:{email: args.newEmail}}).then(result => null)
                    return true
                }catch(error){
                    console.log(error)
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
            resolve(parent, args) {
                try{
                    UserModel.updateOne({username: args.username}, {$set:{phone: args.newPhone}}).then(result => null)
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
                userId: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        // Segment
        addSegment: {
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                blogId: { type: GraphQLNonNull(GraphQLString) },
                context: { type: GraphQLNonNull(GraphQLString) },
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
            type: GraphQLBoolean,
            args: {
                username: { type: GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                try{
                    var curDate = new Date();
                    var mins = curDate.getMinutes() < 10 ? "0" + curDate.getMinutes() : curDate.getMinutes();
                    var curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + "/" + curDate.getDate() + " " + curDate.getHours() + ":" + mins;
                    args = {...args, segments: [], publishDate: curTime};
                    BlogModel.create(args).then(result => null);
                    return true
                }catch(error){
                    console.log(error)
                    return false
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})