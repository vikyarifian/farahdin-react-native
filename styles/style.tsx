import { COLORS } from "@/assets/constatns/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: "center",
    // alignItems: "flex-start",
    backgroundColor: "#131415",
  },
  appName: {
    fontSize: 42,
    fontFamily: 'Cookie-Regular',
    fontWeight: "500",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tagline: {
        fontSize: 16,
        color: COLORS.grey,
        letterSpacing: 1,
        textTransform: "lowercase"
  },
  header1: {
    flex: 1,
    padding: 10,
    width: "90%",
    height: 250,
    alignItems: "center",
    backgroundColor: "#131415",
  },
  title: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    alignItems: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
    button: {
        backgroundColor: '#f6ac00',
        padding: 2,
        borderRadius: 10,
        borderBlockColor: '#f6ac00',
        borderWidth: 0.2,
        borderStyle: 'solid',
        borderColor: '#f6ac00',
        color: '#f6ac00',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    listItemText: {
        fontSize: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    footer: {
        fontSize: 14,
        color: "#999",
        marginTop: 10,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 16,
        color: "#333",
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: "#333",
    },
    modalButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        marginBottom: 20,
    },
    scrollView: {
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        padding: 10,
    },
    tabBarItem: {
        flex: 1,
        alignItems: "center",
    },
    tabBarItemText: {
        fontSize: 16,
        color: "#007BFF",
    },
    tabBarActiveItemText: {
        fontWeight: "bold",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#666",
    },
    headerButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    headerButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    footerButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
    },
    footerButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginTop: 10,
    },
    successText: {
        color: "green",
        fontSize: 14,
        marginTop: 10,
    },
    warningText: {
        color: "orange",
        fontSize: 14,
        marginTop: 10,
    },
    infoText: {
        color: "blue",
        fontSize: 14,
        marginTop: 10,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    loadingText: {
        fontSize: 16,
        color: "#333",
        marginTop: 10,
    },
    list: {
        width: "100%",
        padding: 10,
    },
    listHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    listFooter: {
        fontSize: 14,
        color: "#999",
        marginTop: 10,
    },
    listItemSeparator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 5,
    },

    listEmptyText: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
        marginTop: 20,
    },
    listItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    listItemTextContainer: {
        flex: 1,
        justifyContent: "center",
    },
},
);  