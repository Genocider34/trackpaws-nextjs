import axios from "axios";

interface EmailData {
    sender: {
        email: string;
        name: string;
    };
    to: Array<{
        email: string;
    }>;
    subject: string;
    textContent: string;
}

const sendEmailNotification = async(useremail: string, reason: string) :Promise<void> => {

    const apiKey = process.env.AXIOS_PRIVATE_KEY;

    const emailData: EmailData = {
        sender: {
            email: "trackpaws.adm@gmail.com",
            name: "Trackpaws",
        },
        to: [{
            email: useremail,
        }],
        subject: "Request Denied",
        textContent: `Your pending request application was denied.\nReason: ${reason}`,
    };

    try {
        const response = await axios.post(
            "https://api.sendinblue.com/v3/smtp/email",
            emailData,
            {
                headers: {
                    "Content-Type" : "application/json",
                    "api-key" : apiKey,
                },
            }
        );

        console.log("Email sent successfully: ", response.data);
    }
    catch(error : unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Failed to send email: ", error.response ? error.response.data : error.message);
        }
        else {
            console.error("An unexpected error occurred:", error);
        }
    }
};

export default sendEmailNotification;
