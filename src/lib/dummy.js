
import  * as uuidv4  from 'uuid';
import faker from 'faker'
import { encrypt, encryptpass, sendVerifyEmail, generateuUserID, generateJWTToken } from '../lib/util';

export default class Dummy {

    /**
     * @description gets dummy data for list of post
     */
    static getDummyPost() {
        let data = [];

        for (let index = 0; index < 10; index++) {
            data.push(
                {
                    user: {
                        id: uuidv4.v4(),
                        fullName: `${faker.name.findName()}` ,
                        profilePicture: {
                            url: 'https://i.pravatar.cc/300'
                        }
                    },
                    post: {
                        id: uuidv4.v4(),
                        message: faker.lorem.text(),
                        comments: Math.floor(Math.random() * 100) + 10,
                        photos: (() => {
                            const data = [];
                            for (let index = 0; index < Math.floor(Math.random() * 5) + 1; index++) {
                                data.push({ url: 'https://picsum.photos/500' })
                            }
                            return data;
                        })(),
                        likes: {
                            total: Math.floor(Math.random() * 100) + 10,
                            iLike: Boolean(Math.random() < 0.5),
                        },
                        shares: Math.floor(Math.random() * 100) + 10,
                        dateCreated: faker.date.past(),
                    }
                }
            );
        }

        return {
            items: data,
            totalItems: Math.floor(Math.random() * 100) + 10,
            pageSize: 10,
            pageNumber: 1,
        }
    }

    /**
     * @description gets dummy data for list of post
     */
    static getDummyPostComments() {
        let data = [];

        for (let index = 0; index < 10; index++) {
            data.push(
                {
                    user: {
                        id: uuidv4.v4(),
                        fullName: `${faker.name.findName()}` ,
                        profilePicture: {
                            url: 'https://i.pravatar.cc/300'
                        }
                    },
                    message: faker.lorem.text(),
                    dateCreated: faker.date.past(),
                }
            );
        }

        return {
            items: data,
            totalItems: Math.floor(Math.random() * 100) + 10,
            pageSize: 10,
            pageNumber: 1,
        }
    }

    /**
     * @description gets list of feeds and titles
     */
    static getFeedsTitle() {
        let data = [];

        for (let index = 0; index < 50; index++) {
            data.push(
                {
                    title: faker.company.catchPhraseNoun(),
                    titleId: uuidv4.v4(),
                }
            );
        }

        return {
            ...data
        }
    }

    /**
     * @description gets list of feeds and titles
     */
    static getDummyUserNames() {
        let data = [];

        for (let index = 0; index < 10; index++) {
            data.push(
                {
                    id: uuidv4.v4(),
                    fullName: `${faker.name.findName()}` ,
                    profilePicture: {
                        url: 'https://i.pravatar.cc/300'
                    }
                }
            );
        }

        return {
            items : data,
            totalItems: Math.floor(Math.random() * 100) + 10,
            pageSize: 10,
            pageNumber: 1,
        }
    }

    /**
     * @description gets list connections to start a chat
     */
    static getMessageConnections() {
        let data = [];

        const writer = uuidv4.v4();

        for (let index = 0; index < 10; index++) {
            const writee = uuidv4.v4();
            data.push(
                {
                    user: {
                        userId: writee,
                        fullName: `${faker.name.findName()}`,
                        profilePicture: {
                            url: 'https://i.pravatar.cc/300'
                        },
                    },
                    chatId: `${writer}_${writee}`,
                    isUserOnline: Boolean(Math.random() < 0.5),
                    totalUnread: Math.floor(Math.random() * 100) + 10,
                    lastMessage: 
                    {
                        Id: `${uuidv4.v4()}`,
                        chatId: `${writer}_${writee}`,
                        message: faker.lorem.text(),
                        dateCreated: faker.date.past(),
                        from: Math.random() < 0.5 ? writer : writee,
                        hasOtherSeen: Boolean(Math.random() < 0.5),
                    }
                }
            );
        }

        return {
            items : data,
            totalItems: Math.floor(Math.random() * 100) + 10,
            pageSize: 10,
            pageNumber: 10,
            filter: {
                recent: Boolean(Math.random() < 0.5),
                isOnline: Boolean(Math.random() < 0.5),
            }
        }
    }

    /**
     * @description gets list of chat of a message
     */
    static getMessageChat() {
        let data = [];
        const writer = uuidv4.v4();
        const writee = uuidv4.v4();

        for (let index = 0; index < 10; index++) {
            data.push(
                {
                    Id: `${uuidv4.v4()}`,
                    chatId: `${writer}_${writee}`,
                    message: faker.lorem.text(),
                    dateCreated: faker.date.past(),
                    from: Math.random() < 0.5 ? writer : writee,
                    hasOtherSeen: Boolean(Math.random() < 0.5),
                }
            );
        }

        return {
            writer : {
                id: writer,
                fullName: `${faker.name.findName()}`,
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
            },
            writee : {
                id: writee,
                fullName: `${faker.name.findName()}`,
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
            },
            items : data,
            totalItems: Math.floor(Math.random() * 100) + 10,
            pageSize: 10,
            pageNumber: 10,
        }
    }

        /**
     * @description send a message in a chat
     */
    static sendChatMessage(message) {

        const writer = uuidv4.v4();
        const writee = uuidv4.v4();
        const state = Boolean(Math.random() < 0.5);
        return {
            Id: `${uuidv4.v4()}`,
            chatId: `${writer}_${writee}`,
            message,
            dateCreated: faker.date.past(),
            from: state ? writer : writee,
            to: !state ? writer : writee,
            hasOtherSeen: false,
        }
    }


    /**
     * @description sign in jwt data
     */
    static signInData(email) {

        const userId = uuidv4.v4();

        const jwt = generateJWTToken({ _id: userId, role: ['user'] });
        
        return {
            jwtToken: jwt,
            email,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            profilePicture: {
                url: 'https://i.pravatar.cc/300'
            },
            isverified: Boolean(Math.random() < 0.5),
        }
    }

    /**
     * @description sign in jwt data
     */
    static notifyPostComment(text) {        
        return {
            subject: {
                id: uuidv4.v4(),
                name: faker.name.findName(),
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
            },
            verb: 'postComment',
            object: {
                comment: text,
                commentId: uuidv4.v4(),
                authorId: uuidv4.v4(),
                author: faker.name.findName()
            }
        }
    }

    /**
     * @description sign in jwt data
     */
    static notifyFollowUser(iAmFollowing) {        
        return {
            subject: {
                id: uuidv4.v4(),
                name: faker.name.findName(),
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
                iAmFollowing
            },
            verb: 'followUser',
            object: {
                id: uuidv4.v4(),
                name: faker.name.findName(),
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
            }
        }
    }

    /**
     * @description sign in jwt data
     */
    static notifyLikePost() {        
        return {
            subject: {
                id: uuidv4.v4(),
                name: faker.name.findName(),
                profilePicture: {
                    url: 'https://i.pravatar.cc/300'
                },
            },
            verb: 'likePost',
            object: {
                postTitle: faker.lorem.sentence(),
                postId: uuidv4.v4(),
                authorId: uuidv4.v4(),
                author: faker.name.findName()
            }
        }
    }

    /**
     * @description sign in jwt data
     */
    static signUpData(email) {        
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email,
            userId: uuidv4.v4(),
            isVerified: true,
            msg: "Success",
        }
    }

    /**
     * @description sign in jwt data
     */
    static getProfile(email) {    
        
        let data = [];

        for (let index = 0; index < 5; index++) {
            data.push(
                {
                    title: faker.company.catchPhraseNoun(),
                    titleId: uuidv4.v4(),
                }
            );
        }

        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            bio: faker.lorem.text(),
            id: uuidv4.v4(),
            profilePicture: {
                url: 'https://i.pravatar.cc/300'
            },
            interests: data,
            connections: {
                total: Math.floor(Math.random() * 100) + 10,
                iAmConnected: Boolean(Math.random() < 0.5),
            }

        }
    }


}