import type { NextAuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";

// I removed support by other means of logging in other than through microsoft authentication. The purpose for this is to truly restrict 
// access to the website to only uh.edu emails. Authentication will be done through nextauth and azure active directory. 

export const options: NextAuthOptions = {
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
        })
    ],
}