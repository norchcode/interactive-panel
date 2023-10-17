import prisma from "@/lib/prisma"

export default async function handler(req,res){
    if (req.method === 'POST'){
        const {daerah,aspirasi,username} = req.body
        console.log(req.body)
        const addData = await prisma.user.create({
            data: {
                daerah,
                aspirasi,
                username,
                x: Math.floor(Math.random() * 101),
                y: Math.floor(Math.random() * 101)
            }
        }) 

        return res.json({status: true, data: addData})
    }
}