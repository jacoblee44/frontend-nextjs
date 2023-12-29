import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

import { AdminLayout } from "@/components/layouts";
import { ProfileViewer } from "@/components/molecules/ProfileViewer";

const Profile = () => {
    const router = useRouter();
    const resid: any =
        typeof router?.query?.resid !== "undefined" ? router?.query?.resid : 0;
    return (
        <AdminLayout
            pageProps={{
                title: "Employee profile",
            }}
        >
            <ProfileViewer className="w-[95%] md:w-[80%] max-w-[800px] mx-auto mt-[3rem] mb-[5rem]" resid={ resid } />
        </AdminLayout>
    );
};

export default Profile;
