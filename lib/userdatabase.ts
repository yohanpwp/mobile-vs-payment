import { AuthUserProps, UserDataProps } from "@/constants/propUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function postLogin( user: AuthUserProps ) {
    try {
        const response = await fetch('http://192.168.48.1:4500/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const json = await response.json();
        if (json.token) {
            await saveTokenAsyncStorage(json.token);
            const user = await getCurrentUser();
            return user;
        } else {
            return json; // ได้ message และ token มา
        }
    } catch (error) {
        console.log(error);
    }
    
}

const saveTokenAsyncStorage = async (value: string) => {
    try {
        const token = await AsyncStorage.setItem('@token', value);
        if (token!== null) {
            return;
        }
    } catch (error) {
        return error;
    }
}

const getTokenAsyncStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('@token');
        if (token!== null) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const getCurrentUser = async () => {
    try {
        const token = await getTokenAsyncStorage();
        if (token) {
            const response = await fetch('http://192.168.48.1:4500/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const json = await response.json();
            return json;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const createUser = async ( body: UserDataProps) => {
    try {
        const response = await fetch('http://192.168.48.1:4500/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}
export { postLogin, getTokenAsyncStorage, saveTokenAsyncStorage, getCurrentUser, createUser }