import { Member } from "./member.interface";
import { Realm } from "./realm.interface";

export interface Team {
    name: string
    realm: Realm
    members: Member[]
}