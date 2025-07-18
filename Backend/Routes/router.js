import express from 'express';
import { registerCode } from '../Controller/RegisterCode.js';
import { loginCode } from '../Controller/LoginCode.js';
import { logout } from '../Controller/logoutCode.js';
import { fetchproblemCode } from '../Controller/ProblemfetchCode.js';
import { protectRoute } from '../Utils/AuthController.js';
import { createProblemCode } from '../Controller/ProblemCreation.js';
import { updateProblemCode } from '../Controller/ProblemUpdate.js';
import { deleteProblemCode } from '../Controller/ProblemDelete.js';
import { TestCaseCreationCode } from '../Controller/TestCasesCode.js';
import { TestCaseUpdateCode } from '../Controller/TestCaseUpdate.js';
import { fetchTestCasesByProblemId } from '../Controller/Fetchtestcases.js';
import { DeleteTestCaseCode } from '../Controller/Deletetestcase.js';
import { submitCode } from '../Controller/Submission.js';
import { fetchSubmissionCode } from '../Controller/FetchSubmissions.js';
import { deletesubmissionCode } from '../Controller/DeleteSubmissions.js';
import { fetchAllSubmissions } from '../Controller/FetchallSubmissions.js';
import { verifyEmail } from '../Utils/VerificationEmail.js';
import { CreateAdminCode } from '../Controller/CreateAdmin.js';
import { UpdateUser } from '../Controller/UpdateUser.js';
import { deleteUserCode } from '../Controller/UserDelete.js';
import { ForgotPassword } from '../Controller/ForgotPassword.js';
import { CreatePassword } from '../Utils/ResetPassword.js';

const router = express.Router();

router.post('/register', registerCode)
router.post('/login', loginCode)
router.get('/verify-email', verifyEmail);
router.post('/forgotpassword', ForgotPassword);
router.post('/resetpassword', CreatePassword) // Assuming ForgotPassword is imported from the appropriate controller

router.put('/updateuser', protectRoute, UpdateUser);
router.delete('/deleteuser', protectRoute, deleteUserCode); // Assuming deleteUserCode is imported from UserDelete.js
router.get('/logout', logout)

router.get('/fetchproblem', protectRoute, fetchproblemCode);
router.get('/testcases/:problemId', protectRoute, fetchTestCasesByProblemId); // Assuming this is for fetching test cases by problem ID

router.post('/createproblem', protectRoute, createProblemCode);
router.post('/createtestcases', protectRoute, TestCaseCreationCode);

router.put('/updateproblem/:id', protectRoute, updateProblemCode);
router.put('/updatetestcases', protectRoute, TestCaseUpdateCode); // Assuming this is for updating test cases

router.delete('/deleteproblem/:id', protectRoute, deleteProblemCode);
router.delete('/deletetestcases/:id', protectRoute, DeleteTestCaseCode);

router.post('/submission', protectRoute, submitCode);
router.get('/submissions/:problemId', protectRoute, fetchSubmissionCode);
router.get('/allsubmissions/:problemId', protectRoute, fetchAllSubmissions);
router.delete('/deletesubmissions/:id', protectRoute, deletesubmissionCode)

router.post('/createadmin', protectRoute, CreateAdminCode);



export default router;