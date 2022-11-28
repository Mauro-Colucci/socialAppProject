import { db } from '../config/connect.js'
import jwt from 'jsonwebtoken'

export const getUser = (req, res)=>{
    const userId = req.params.userId

    const q = "SELECT * FROM users WHERE id = ?"

    db.query(q, [userId], (err, data)=>{
        if(err) return res.status(500).json(err)
        const {password, ...info} = data[0]
        return res.status(200).json(info)
    })
}

export const updateUser = (req, res)=>{
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json('not logged in')
    jwt.verify(token, process.env.SECRET_TOKEN, (err, userInfo)=>{
        if(err) return res.status(403).json('token is not valid')

        const q = "UPDATE users SET `name`=?, `city` =?, `website` =?, `profilePic` =?, `coverPic` =? WHERE id =?"

        const values = [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id
        ]

        db.query(q, values,(err, data)=>{
            if(err) return res.status(500).json(err)
            if(data.affectedRows > 0) return res.status(200).json("profile updated")
            return res.status(403).json('you can only update your profile')
        })
    })  
}