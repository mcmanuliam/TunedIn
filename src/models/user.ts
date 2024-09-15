import type {IReactions} from "./reactions";

export interface IUserProfile {
    id: string,

    created_at: Date,

    first_name?: string,

    second_name?: string,

    display_name?: string,

    email?: string,

    profile_setup: Date,
}

export interface IFullUserProfile extends IUserProfile {
    reactions: IReactions,
}
