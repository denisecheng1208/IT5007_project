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

// import { GraphQLInputObjectType } from 'graphql';

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
        userId: { type: GraphQLString },
        context: { type: GraphQLString },
    }
})

const Blog = new GraphQLObjectType({
    name: 'blog',
    fields: {
        id: { type: GraphQLString },
        segments: { type: GraphQLList(Segment) },
        userId: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
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
        findUserByUsername: {
            type: User,
            args: { username: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
            }
        },

        findUserById: {
            type: User,
            args: { userId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
            }
        },

        // Segment
        findSegmentByBlogId: {
            type: Segment,
            args: { blogId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
            }
        },

        // Blog
        findAllBlogsByUserId: {
            type: new GraphQLList(Blog),
            args: { userId: { type: GraphQLNonNull(GraphQLString) } },
            async resolve(parent, args) {
                // ??? 
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
                userId: { type: GraphQLNonNull(GraphQLString) },
                newPassword: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        updateEmail: {
            type: GraphQLBoolean,
            args: {
                userId: { type: GraphQLNonNull(GraphQLString) },
                newEmail: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
            }
        },

        updatePhone: {
            type: GraphQLBoolean,
            args: {
                userId: { type: GraphQLNonNull(GraphQLString) },
                newPhone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
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
            type: Segment,
            args: {
                userId: { type: GraphQLNonNull(GraphQLString) },
                blogId: { type: GraphQLNonNull(GraphQLString) },
                context: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
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
                userId: { type: GraphQLNonNull(GraphQLString) },
                segments: { type: GraphQLList(SegmentInput) },
                title: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // ???
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