import axios from "axios";

export const trackEvent = (data) => {
    if (typeof window === "undefined") return; // safety for SSR

    const token = localStorage.getItem("token"); // 👈 your auth token

    axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/track`,
        data,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        }
    ).catch(() => {});
};
