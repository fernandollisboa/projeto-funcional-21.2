import Label from "./label.interface";
import Reactions  from "./reactions.interface";
import  User  from "./user.interface"

export default interface Issue {
    url:                      string;
    repository_url:           string;
    labels_url:               string;
    comments_url:             string;
    events_url:               string;
    html_url:                 string;
    id:                       number;
    node_id:                  string;
    number:                   number;
    title:                    string;
    user:                     User;
    labels:                   Label[];
    state:                    string;
    locked:                   boolean;
    assignee:                 null;
    assignees:                any[];
    milestone:                null;
    comments:                 number;
    created_at:               string;
    updated_at:               string;
    closed_at:                null;
    author_association:       string;
    active_lock_reason:       null;
    body:                     string;
    reactions:                Reactions;
    timeline_url:             string;
    performed_via_github_app: null;
    state_reason:             null;
}
