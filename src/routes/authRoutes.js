const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {authenticate} = require("../middlewares/authMiddleware");

/**
* @swagger
* /api/auth/register:
*   post:
*       tags: [Auth]
*       summary: Registrasi pengguna baru
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       required: [name, email, password]
*                       properties:
*                           name:
*                               type: string
*                               example: Fajri Rayva
*                           email:
*                               type: string
*                               example: fajri@example.com
*                           password:
*                               type: string
*                               example: password123
*       responses:
*           201:
*               description: Registrasi berhasil
*           400:
*               description: Validasi gagal atau email sudah terdaftar
*/

router.post("/register",authController.register);

/**
* @swagger
* /api/auth/login:
*   post:
*       tags: [Auth]
*       summary: Login dan dapatkan JWT token
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object  
*                       required: [email, password]
*                       properties:
*                           email:
*                               type: string
*                               example: fajri@example.com
*                           password:
*                               type: string
*                               example: password123
*       responses:
*           200:
*               description: Login berhasil, mengembalikan JWT token
*           401:
*               description: Email atau password salah
*/
router.post("/login",authController.login);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Mendapatkan access token baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token baru berhasil dibuat
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Mengubah password user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 *       401:
 *         description: Password lama salah
 */
router.put("/change-password", authenticate, authController.changePassword);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout berhasil
 */
router.post("/logout", authenticate, authController.logout);
module.exports = router;
