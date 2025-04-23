import { COLORS } from "@/assets/constatns/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window")

export const authStyles = StyleSheet.create({
    contrainer: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    brandSection: {
        alignItems: 'center',
        marginTop: height * 0.30,
        marginBottom: 80
    },
    logoContrainer: {
        width: 60,
        height: 60,
        borderRadius: 18,
        padding: 12,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    illustration: {
        width: width * 0.75,
        height: width * 0.75,
        maxHeight: 200
    },
    loginSection: {
        width: "100%",
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center'
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 14,
        marginBottom: 15,
        width: '100%',
        maxWidth: 250,
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5
    },
    googleIconContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.surface,
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        color: COLORS.grey,
        maxWidth: 220,
    }
})