import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

const redirectUrl = Linking.createURL('callback');

export const useSocialAuth = () => {
    const[isLoading, setLoading] = useState(false);
    const{startSSOFlow} = useSSO();

    const handleSocialAuth = async (stratergy : "oauth_google" | "oauth_apple") => {
        setLoading(true);
        try{
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: stratergy,
                redirectUrl
            });
            if(createdSessionId && setActive) {
                await setActive({ session: createdSessionId });

            }

        }catch(error){
            console.log(error);
            const provider = stratergy === "oauth_google" ? "Google" : "Apple";
            Alert.alert(`Failed to login with ${provider}. Please try again later.`);

        }finally {
            setLoading(false);
        }
    }
    return {isLoading, handleSocialAuth};
}