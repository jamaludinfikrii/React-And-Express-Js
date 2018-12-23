var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const mysql = require('mysql')
var app = express();
var port = 2000

const db = mysql.createConnection({
    host:'localhost',
    user:'jamal',
    password:'jamaludin',
    database:'popokpedia',
})

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send({nama : 'Fikri'})
} )

app.get('/produk/:produkid' , (req,res) => {
    console.log(req.params.produkid)
    res.send('<h1>Hello Cuy<h1>')
})
app.get('/produk' , (req,res) => {
    if(nama == undefined){
        nama = ''
    }
    var nama =  req.query.nama
    var sql = `select * from product where nama like '%${nama}%'`;
    db.query(sql, (err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/produk' , (req,res) => {
    var newPopok = {
        nama : req.body.nama,
        harga : req.body.harga,
        deskripsi : req.body.deskripsi,
        image : req.body.image,
        brandId : req.body.brandId
    }
    var nama = req.body.filterNama
    var sql = 'insert into product set ? ;'
    db.query(sql,newPopok, (err, result) => {
        if(err) throw err;
        console.log(result)
        var sql = `select * from product where nama like '%${nama}%'`;
        db.query(sql, (err,result1)=> {
            if(err) throw err;
            console.log(result1);
            res.send(result1);
        })

    })
})

app.put('/produk/:id' , (req,res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.send('Update Success')
})

app.delete('/produk/:id' , (req,res) => {
    console.log(req.params.id)
    res.send('Delete Sucess')
}) 

app.listen(port , () => console.log('API sedang Jalan di Port ' + port) )