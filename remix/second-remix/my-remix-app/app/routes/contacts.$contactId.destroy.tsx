import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteContact } from "~/data";





export const action = async ({
    request,
    params
}: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param")

    await deleteContact(params.contactId)

    return redirect('/')
}