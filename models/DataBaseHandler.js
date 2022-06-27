const mysql = require("mysql")
const fs = require("fs");

class DataBaseHandler {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Password',
            database: 'module3_db',
            charset: 'utf8_general_ci'
        })

    }

    runMysql(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results, fields) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    }

    async loadCityTable() {
        let sql = `SELECT * FROM city;`
        return await this.runMysql(sql).then(results => {
            console.log(results);
            return  results }).catch(err => {
            console.log(err.message)
        })
    }
    async getClientList() {
        let sql =
            `call getClientList();`
        return await this.runMysql(sql).then(results => {
            return  results[0] }).catch(err => {
            console.log(err.message)
        })
    }



    async editCity(cityObj){
        let sql =   `call editCity(
                    ${cityObj.id},
                    '${cityObj.cityName}',
                    ${Number(cityObj.country)},
                    ${Number(cityObj.area)},
                    ${Number(cityObj.population)},
                    ${Number(cityObj.GDP)},
                    '${cityObj.description}',
                    );`
        return await this.runMysql(sql).catch(err => {
            console.log(err.message)
        })
    }


    //
    // async createEmployee(employeeObj){
    //     let sql =   `call insertEmployee (
    //                 ${employeeObj.ID},
    //                 '${employeeObj.firstName_el}',
    //                 '${employeeObj.lastName_el}',
    //                 '${employeeObj.DOB}',
    //                 '${employeeObj.gender}',
    //                 ${employeeObj.salary},
    //                 ${employeeObj.supervisorId_el},
    //                 ${employeeObj.branch_el},
    //                 '${employeeObj.email}',
    //                 '${employeeObj.password}');`
    //     return await this.runMysql(sql).then(results =>{
    //         console.log("successful created " + results.affectedRows + " employee");
    //     }).catch(err => {
    //         console.log(err.message)
    //     })
    // }



}

module.exports = DataBaseHandler;