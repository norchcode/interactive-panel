import prisma from "@/lib/prisma"

export default async function handler(req,res){
    const {avatar,daerah,aspirasi} = req.body
    console.log(req.body)
    const addData = await prisma.user.create({
        data: {
            avatar,
            daerah,
            aspirasi
        }
    }) 

    return res.json(addData)
}