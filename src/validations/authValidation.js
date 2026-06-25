const {z} = require("zod");

const registerSchema = z.object({
    name: z.string().min(3,{message:"Nama minimal 3 karakter"}),
    email: z.string().email({message: "Format email tidak valid."}),
    password: z.string().min(8,{message:"Password minimal 8 karakter."}),
    role: z.enum(["USER","MODERATOR"],{
        errorMap: ()=>({message:"Role hanya boleh USER atau MODERATOR."})    
    }).optional().default("USER"),
});

const loginSchemaFull = z.object({
    email: z.string().email({message: "Format email tidak valid."}),
    password: z.string().min(1,{message: "Password tidak boleh kosong."}),
});

const changePasswordSchema = z.object({
    oldPassword: z.string().min(1,{message: "Password lama tidak boleh kosong"}),
    newPassword: z.string().min(8,{message: "Password baru minimal 8 karakter."}),
});

module.exports = { registerSchema, loginSchemaFull, changePasswordSchema };