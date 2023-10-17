import prisma from "@/lib/prisma"

export default async function handler(req,res){
    if (req.method === 'GET'){
        const data = await prisma.user.findMany({
            take: 4
        }) 

        return res.json({status: true, data: data})
    }
}