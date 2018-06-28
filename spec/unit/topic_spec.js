const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {

        this.topic;
        this.post;
        sequelize.sync({ force: true }).then((res) => {

            Topic.create({
                title: "Henry VIII's Wives",
                description: "Which is your favorite?"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "Jane Seymour",
                    body: "She had his only male heir",

                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create", () => {
        it("should create a topic and store it in the database", (done) => {
            Topic.create({
                title: "Henry VIII's Wives",
                description: "Which is your favorite?"
            })
            .then((topic) => {
                expect(topic.title).toBe("Henry VIII's Wives");
                expect(topic.description).toBe("Which is your favorite?");
                done();
            })
        });

    });

    describe("#getPosts", () => {
        it("should return an array of post objects associated with the topic called", (done) => {
            Post.create({
                title: "Jane Seymour",
                body: "She had his only male heir",
                topicId: this.topicId
            })
            this.topic.getPosts()
            .then((posts) => {
                expect(posts[0].title).toBe("Jane Seymour");
                done();
            })

        })
    })
})