import axios from "axios";
import Config from "./Config";

export class Repository {

    static async getTransactions(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.Transactions,
                { headers: authContext.header()}
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            })
    }

    static async updateTransactions(authContext, tagUpdates) {
        axios
            .post(
                Config.Endpoints.Transactions,
                {
                    transactionUpdates: tagUpdates
                },
                {headers: authContext.header()}
            )
            .then((response) => {
                // console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    static async getBanks(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.Banks,
                {
                    headers: authContext.header()
                })
            .then(onSuccess)
            .catch(error => {
                console.log(error)
            })
    }

    static async createRequisition(bankCode, authContext, onSuccess) {
        axios
            .post(
                Config.Endpoints.Requisition,
                {
                    "bankCode": bankCode
                },
                {
                    headers: authContext.header()
                }
            )
            .then(onSuccess)
            .catch(error => {
                console.log(error)
            })
    }

    static async loadTags(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.Tags,
                {headers: authContext.header()}
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            })
    }

    static async removeTag(transactionId, authContext) {
        axios
            .post(
                Config.Endpoints.Transactions.tag,
                {
                    transactionId: transactionId,
                    tagId: null
                },
                {headers: authContext.header()}
            )
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    static async addTag(authContext, tag){
        axios
            .put(
                Config.Endpoints.Tags,
                tag,
                {headers: authContext.header()}
            )
            .then()
            .catch(error => console.log(error))
    }

    static async editTag(authContext, tag, onSuccess) {
        axios
            .patch(
                Config.Endpoints.Tags,
                tag,
                {headers: authContext.header()}
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            })
    }

    static async setTagCategory(authContext, tagId, code){
        axios
            .patch(
                Config.Endpoints.Tags,
                {
                    tagId: tagId,
                    categoryCode: code
                },
                { headers: authContext.header()}
            )
            .catch((error) => {
                console.log(error)
            })
    }

    static async addRule(authContext, rule) {
        axios
            .put(
                Config.Endpoints.Rules,
                rule,
                { headers: authContext.header()}
            )
            .catch((error) => {
                console.log(error)
            })
    }

    static async updateAccounts(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.UpdateAccounts,
                {
                    headers:authContext.header()
                }
            )
            .then(onSuccess)
    }

    static async updateRequisition(authContext, clientReference, onSuccess) {
        axios({
            method: 'PATCH',
            url: Config.Endpoints.Requisition,
            headers: authContext.header(),
            data: {"clientRef": clientReference, "status": "ACTIVE"}
        })
            .then(response => {
                console.log(`Successfully updated requisition with id: ${clientReference}`)
                onSuccess()
            })
            .catch(error => {
                console.log(`Error updating requisition with id: ${clientReference}`)
                console.log(error)
            })
    }

    static async deleteRequisition(authContext, clientReference) {
        axios({
            method: 'DELETE',
            url: Config.Endpoints.Requisition,
            headers: authContext.header(),
            data: {clientRef: clientReference}
        })
            .then(() => console.log(`Successfully deleted requisition with id: ${clientReference}`))
            .catch(error => {
                console.log(`Error deleting requisition with id: ${clientReference}`)
                console.log(error)
            })
    }

    static async getProfileData(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.ProfileData,
                {
                    headers: authContext.header()
                }
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            });
    }

    static async getReports(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.Reports,
                {headers: authContext.header()}
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            })
    }

    static async loadHolidays(authContext, onSuccess) {
        axios
            .get(
                Config.Endpoints.Holidays,
                {headers: authContext.header()}
            )
            .then(onSuccess)
            .catch((error) => {
                console.log(error)
            })
    }
}