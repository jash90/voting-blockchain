import axios from "axios";

const base_url = "http://80.211.222.149:3000";

const auth = {
    register: base_url + "/register",
    login: base_url + "/login",
    getUserRequest: base_url + "/getuserrequest",
    changeUserRequest: base_url + "/changeuserrequest"
};

const question = {
    getQuestionsUser: base_url + "/questionsUser",
    getQuestionsMod: base_url + "/questionsMod",
    addQuestion: base_url + "/addquestion",
    editQuestion: base_url + "/editquestion",
    removeQuestion: base_url + "/removequestions"
}

const answer = {
    getAnswers: base_url + "/answers",
    addAnswer: base_url + "/addanswer",
    editAnswer: base_url + "/editanswer",
    removeAnswer: base_url + "/removeanswer"
}

const answerUser = {
    addAnswerUser: base_url + "/addansweruser",
    getAnswerUser: base_url + "/getansweruser"
};

const userRole = {
    getUserRole: base_url + "/getuserrole",
    addUserRole: base_url + "/adduserrole",
    editUserRole: base_url + "/edituserrole",
    removeUserRole: base_url + "/removeuserrole"
}

export default class Api {

    static async login(username, password) {
        try {
            let response = await axios.post(auth.login, {
                "username": username,
                "password": password
            });

            return response.data;

        } catch (error) {
            return error;
        }

    }

    static async register(username, password, userRoleId = 3, firstname, lastname, email) {
        try {
            let response = await axios.post(auth.register, {
                "username": username,
                "password": password,
                "userRoleId": userRoleId,
                "email": email,
                "firstname": firstname,
                "lastname": lastname
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getUserRequest(token) {
        try {
            let response = await axios.post(auth.getUserRequest, {"token": token});
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async changeUserRequest(token, id, userRoleId) {
        try {
            let response = await axios.post(auth.changeUserRequest, {
                "token": token,
                "id": id,
                "userRoleId": userRoleId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async addUserRole(token, name, login, register) {
        try {
            let response = await axios.post(userRole.addUserRole, {
                "token": token,
                "name": name,
                "login": login,
                "register": register
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async editUserRole(token, name, login, register, userRoleId) {
        try {
            let response = await axios.post(userRole.editUserRole, {
                "token": token,
                "name": name,
                "login": login,
                "register": register,
                "userRoleId":userRoleId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getUserRole() {
        try {
            let response = await axios.get(userRole.getUserRole);
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async removeUserRole(userRoleId, token) {
        try {
            let response = await axios.post(userRole.removeUserRole, {
                "userRoleId": userRoleId,
                "token": token
            });
            console.log(response);
            return response.data;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async addAnswerUser(token, answerId) {
        try {
            let response = await axios.post(answerUser.addAnswerUser, {
                "answerId": answerId,
                "token": token
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getAnswerUser(token, questionId) {
        try {
            let response = await axios.post(answerUser.getAnswerUser, {
                "questionId": questionId,
                "token": token
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async addAnswer(token, name, questionId) {
        try {
            let response = await axios.post(answer.addAnswer, {
                "token": token,
                "name": name,
                "questionId": questionId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async editAnswer(token, name, questionId, answerId) {
        try {
            let response = await axios.post(answer.editAnswer, {
                "token": token,
                "name": name,
                "questionId": questionId,
                "answerId": answerId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getAnswers(token, questionId) {
        try {
            let response = await axios.post(answer.getAnswers, {
                "token": token,
                "questionId": questionId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async removeAnswer(token, answerId) {
        try {
            let response = await axios.post(answer.removeAnswer, {
                "token": token,
                "answerId": answerId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async addQuestion(token, name, multiAnswer, userRoleId) {
        try {
            let response = await axios.post(question.addQuestion, {
                "token": token,
                "name": name,
                "multiAnswer": multiAnswer,
                "userRoleId": userRoleId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async editQuestion(token, name, questionId, multiAnswer, userRoleId) {
        try {
            let response = await axios.post(question.editQuestion, {
                "token": token,
                "name": name,
                "questionId": questionId,
                "multiAnswer": multiAnswer,
                "userRoleId": userRoleId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getQuestionsMod(token) {
        try {
            let response = await axios.post(question.getQuestionsMod, {"token": token});
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async getQuestionsUser(token) {
        try {
            let response = await axios.post(question.getQuestionsUser, {"token": token});
            return response.data;

        } catch (error) {
            return error;
        }
    }

    static async removeQuestion(token, questionId) {
        try {
            let response = await axios.post(question.removeQuestion, {
                "token": token,
                "questionId": questionId
            });
            return response.data;

        } catch (error) {
            return error;
        }
    }
}
