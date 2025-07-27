import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { updateUser } from "../Service/UpdateUserApi";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../Service/DeleteUserApi";

function ProfileBox({ className, setDialogOpen, setDialogMessage, setOnDialogConfirm }) {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Message, setMessage] = useState("");
    const [EditMode, setEditMode] = useState(false);
    const loading = useSelector((state) => state.auth.loading);
    const [deletemessage, setDeleteMessage] = useState("");
    const [formData, setFormData] = useState({
        username: user.username || "",
        email: user.email || "",
        Phone_Number: user.Phone_Number || "",
        Age: user.Age || "",
        Role: user.Role || "",
    });

    useEffect(() => {
        setFormData({
            username: user.username || "",
            email: user.email || "",
            Phone_Number: user.Phone_Number || "",
            Age: user.Age || "",
            Role: user.Role || "",
        });
    }, [EditMode])

    const HandleEditorSubmit = async () => {
        if (!EditMode) {
            setEditMode(true);
            return;
        } else {
            if (loading) return;
            dispatch({ type: 'auth/setloading' });

            const name = formData.username.trim();
            const word = name.split(" ");
            const firstname = word[0] || "";
            const lastname = word.length > 1 ? word[word.length - 1] : "";

            const dataToSend = {
                ...formData,
                firstname,
                lastname,
            };
            try {
                const response = await updateUser(dataToSend);
                dispatch({ type: 'auth/updateUser', payload: response.user });
                setMessage(response.message);
                setEditMode(false);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        // Handle unauthorized access
                        setEditMode(false);
                        location.state = { message: error.response.data.message }
                        dispatch({ type: 'auth/logout' });
                        console.error("Unauthorized access:", error.response.data);
                        navigate('/login', { state: { message: error.response.data.message } });
                    } else {
                        setMessage(typeof error.response.data === "object" ? (error.response.data?.message || error.response.data?.error) : error.response.data);
                        console.log(error.response.data);
                        console.error("Error updating user:", error.response.data);
                        setEditMode(false);
                    }
                } else {
                    setMessage(error.message || "An error occurred while updating user.");
                    console.error("Network error:", error);
                    setEditMode(false);
                }
            } finally {
                dispatch({ type: 'auth/clearLoading' });
            }
        }
    }
    const handleDeleteUser = async () => {
        setDialogMessage("Are you sure you want to delete your account?");
        setDialogOpen(true);
        setOnDialogConfirm(() => async () => {
            if (loading) return;
            dispatch({ type: 'auth/setloading' });
            try {
                const response = await deleteUser();
                dispatch({ type: 'auth/logout' });
                navigate('/');
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        // Handle unauthorized access
                        location.state = { message: error.response.data.message }
                        dispatch({ type: 'auth/logout' });
                        console.error("Unauthorized access:", error.response.data);
                        navigate('/login', { state: { message: error.response.data.message } });
                    } else {
                        setDeleteMessage(typeof error.response.data === 'object' ? error.response.data?.message || error.response.data?.error : error.response.data);
                        console.error("Error response:", error.response.data);
                    }
                } else {
                    setDeleteMessage(error.message);
                    console.error("Error:", error);
                }
            } finally {
                dispatch({ type: 'auth/clearLoading' });
            }
        })
    };

    const box = " focus:outline-none focus:ring-2 px-1 placeholder-black bg-gray-300 ml-4 rounded-full disabled:bg-gray-600 disabled:text-[#a0522d] disabled:font-tomorrow disabled:px-4 truncate w-[300px] h-8 transition delay-50 duration-500 hover:scale-105 hover:translate-y-1"




    return (
        <div className={className + " relative w-full min-h-screen shiny-bg"}>
            <div className="relative z-10 w-full min-h-screen flex gap-2 justify-between">
                <div className="relative h-fit w-[400px] m-8 ">
                    <div className=" static w-[400px] h-fit flow-shadow flex flex-col items-center p-8 bg-gradient-to-tl from-[#a0522d] to-[#5c4033] bordering">
                        <img src="/pexels-alex-montes-892479-1820563.jpg" className="w-[250px] h-[250px] outline-2 outline-offset-1 outline-dashed rounded-full" />
                        <h1 className="text-2xl font-tomorrow tracking-wider border-[1px] rounded-lg p-2 border-black bg-gradient-to-r from-fuchsia-500 to-indigo-500 to-60% bg-clip-text text-transparent w-full mt-8 mb-8">
                            <span className=" bg-gradient-to-r from-fuchsia-500 to-indigo-500 to-60% bg-clip-text text-transparent min-w-fit break-words">{user.username}</span>
                        </h1>
                        {deletemessage && <p className="text-red-500 text-center font-gruppo font-bold">{typeof deletemessage === "string" ? deletemessage : deletemessage?.message || "An Error Occured"}</p>}
                        <div className="absolute z-20 bottom-0 left-0 w-[50px] h-[50px]">
                            <button className="cursor-pointer w-20 h-20 bg-gradient-to-r from-fuchsia-500 to-indigo-500 to-60%  rounded-full mt-4 m-[-20px] font-tomorrow tracking-wider hover:scale-115 transition-all duration-500"
                                onClick={handleDeleteUser}
                                disabled={loading}>
                                {loading ? "Deleting..." : "Delete Account"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[700px] bordering m-12 p-4 bg-gradient-to-tl bg-blend-color flow-shadow from-[#0e0d0d] to-[#434343] to-80%">
                    <h1 className="w-full text-center font-imperialscript text-6xl text-blue-300 "> User Details: </h1>
                    <div className="flex flex-col gap-2 mt-4 items-center p-4 w-[600px] space-y-8">
                        <div className="flex flex-row w-full border-[1px] border-dashed rounded-lg p-2 border-black bg-gradient-to-r justify-between" >
                            <label className=" font-bold font-baskervville text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent ">UserName:</label>
                            <input type="text" placeholder='Enter Your Username' className={`${box}`} value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} required
                                disabled={!EditMode} />
                        </div>
                        <div className="flex flex-row w-full border-[1px] border-dashed rounded-lg p-2 border-black bg-gradient-to-r items-center justify-between" >
                            <label className=' font-bold font-baskervville text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Email:</label>
                            <input type="email" placeholder='Email Address' className={`${box}`} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required
                                disabled={true} />
                        </div>
                        <div className="flex flex-row w-full border-[1px] border-dashed rounded-lg p-2 border-black bg-gradient-to-r items-center justify-between" >
                            <label className=' font-bold font-baskervville text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Contact Number:</label>
                            <input type="number" placeholder='Contact_Number' className={`${box}`} value={formData.Phone_Number} onChange={e => setFormData({ ...formData, Phone_Number: e.target.value })} required
                                disabled={!EditMode} />
                        </div>
                        <div className="flex flex-row w-full border-[1px] border-dashed rounded-lg p-2 border-black bg-gradient-to-r items-center justify-between" >
                            <label className=' font-bold font-baskervville text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Age:</label>
                            <input type="number" placeholder='Age' className={`${box}`} value={formData.Age} onChange={e => setFormData({ ...formData, Age: e.target.value })} required
                                disabled={!EditMode} />
                        </div>
                        <div className="flex flex-row w-full border-[1px] border-dashed rounded-lg p-2 border-black bg-gradient-to-r items-center justify-between">
                            <label className=' font-bold font-baskervville text-xl bg-gradient-to-r from-[#050505] via-[#af0000] to-[#5f5f5f] bg-clip-text text-transparent'>Role:</label>
                            <select className={`${box}`} value={formData.Role} onChange={e => setFormData({ ...formData, Role: e.target.value })} required
                                disabled={!EditMode}>
                                <option value="" disabled >Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <button className="cursor-pointer w-40 h-10 bg-gradient-to-r from-fuchsia-500 to-indigo-500 to-60% rounded-full mt-4 font-tomorrow tracking-wider hover:scale-115 transition-all duration-500"
                            onClick={HandleEditorSubmit}
                            disabled={loading}
                        >
                            {EditMode ? (!loading ? "Save Changes" : "Saving") : "Edit Profile"}
                        </button>
                        {Message && <p className="text-red-500 text-center font-gruppo font-bold">{typeof Message === "string" ? Message : Message?.message || "An Error Occured"}</p>}

                        <div className="w-fit h-fit mt-2">
                            {loading && <Spinner />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfileBox;