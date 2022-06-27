const fs = require("fs");
const qs = require('qs');
const DataBaseHandlerClass = require("../models/DataBaseHandler.js")
const DataBaseHandler = new DataBaseHandlerClass()


class Handlers {
    constructor() {
        this.notfound = async (req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            return res.end('<h1>Page not found</h1>');
        }

        this.home = async (req, res) => {
            if (req.method === 'POST') {
                let dataInForm = await this.loadDataInForm(req)
                if (dataInForm.functioning === 'edit-btn') {
                    console.log(dataInForm);
                    await DataBaseHandler.editCity(dataInForm);
                }
                if (dataInForm.functioning === 'addCity') {
                }
            }
            this.loadHomePage(res);
        }
    }

    loadHomePage(res) {
        fs.readFile('./views/home.html', "utf-8", (err, data) => {
            DataBaseHandler.loadCityTable().then(results => {
                let tableHead = ''
                let tableHeadTile = []
                let html = ''
                Object.keys(results[0]).forEach(prop => {
                    tableHead += `<th>${prop.toUpperCase()}</th>`;
                    tableHeadTile.push(prop);
                })
                results.forEach(element => {
                    html += `<tr>`
                    for (let i = 0; i < tableHeadTile.length; i++) {
                        let printOutValue = element[`${tableHeadTile[i]}`];
                        html += `<td class= "d-none d-md-table-cell" >${printOutValue} </td>`
                    }
                    html += `<td class="d-none d-md-table-cell">${this.editButton(JSON.stringify(element))}</td>`
                    html += `<td class="d-none d-md-table-cell">${this.deleteButton(element.ID)}</td>`
                    html += `</tr>`
                })
                data = data.replace('{tableHead}', tableHead).replace('{tableData}', html)
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data)
                res.end();
            }).catch(err => {
                console.log(err.message)
            })
        })
    }

    editButton(obj) {
        return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" onclick='getData(${obj})'>
                <i class="align-middle me-2" data-feather="edit"></i>
                Edit
                </button>`
    }

    deleteButton(value) {
        return `<form method="post" action="/admin"> 
                <input type="text" name="functioning" value="delete-btn" hidden>
                <input type="number" name="employeeID" value="${value}" hidden>
                <button type="submit" class="btn btn-danger">
                <i class="align-middle me-2" data-feather="user-minus"></i>
                Delete
                </button>
                </form>`
    }

    loadDataInForm(req) {
        let data = ''
        return new Promise((resolve, reject) => {
            req.on("data", chunks => {
                data += chunks
            })
            req.on('end', () => {
                data = qs.parse(data)
                resolve(data)
            })
            req.on('error', (err) => {
                reject(err)
            })
        })

    }
}

module.exports = Handlers;
