// (C) 2019-2022 GoodData Corporation
import {
    IWorkspaceAccessControlService,
    IWorkspaceUserGroupsQuery,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUsersQuery,
    IWorkspaceUsersQueryOptions,
    IWorkspaceUsersQueryResult,
} from "@gooddata/sdk-backend-spi";
import { RecordedBackendConfig } from "./types";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import { ObjRef, IWorkspaceUser, AccessGranteeDetail, IAccessGrantee } from "@gooddata/sdk-model";
import noop from "lodash/noop";

/**
 * @internal
 */
export function recordedUserGroupsQuery(implConfig: RecordedBackendConfig): IWorkspaceUserGroupsQuery {
    return {
        query: (_options: IWorkspaceUserGroupsQueryOptions) => {
            const result = implConfig.userManagement?.userGroup?.userGroups ?? [];
            return Promise.resolve(new InMemoryPaging(result));
        },
    };
}

/**
 * @internal
 */
export function recordedAccessControlFactory(
    implConfig: RecordedBackendConfig,
): IWorkspaceAccessControlService {
    return {
        getAccessList: (_sharedObjectRef: ObjRef): Promise<AccessGranteeDetail[]> => {
            const result = implConfig.userManagement?.accessControl?.accessList ?? [];

            return Promise.resolve(result);
        },
        grantAccess: noop as (sharedObject: ObjRef, grantees: IAccessGrantee[]) => Promise<void>,
        revokeAccess: noop as (sharedObject: ObjRef, grantess: IAccessGrantee[]) => Promise<void>,
    };
}

/**
 * @internal
 */
export class RecordedWorkspaceUsersQuery implements IWorkspaceUsersQuery {
    private config: RecordedBackendConfig = {};

    constructor(config: RecordedBackendConfig) {
        this.config = config;
    }

    withOptions(_options: IWorkspaceUsersQueryOptions): IWorkspaceUsersQuery {
        return this;
    }

    queryAll(): Promise<IWorkspaceUser[]> {
        const result = this.config?.userManagement?.users?.users ?? [];
        return Promise.resolve(result);
    }

    query(): Promise<IWorkspaceUsersQueryResult> {
        const result = this.config.userManagement?.users?.users ?? [];
        return Promise.resolve(new InMemoryPaging(result));
    }
}
