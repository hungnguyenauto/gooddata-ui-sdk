// (C) 2021 GoodData Corporation
import isEmpty from "lodash/isEmpty";
import { DashboardContext } from "../types/commonTypes";

/**
 * @alpha
 */
export type DashboardEventType =
    | "GDC.DASH/EVT.COMMAND.FAILED"
    | "GDC.DASH/EVT.COMMAND.REJECTED"
    | "GDC.DASH/EVT.QUERY.FAILED"
    | "GDC.DASH/EVT.QUERY.REJECTED"
    | "GDC.DASH/EVT.QUERY.STARTED"
    | "GDC.DASH/EVT.QUERY.COMPLETED"
    | "GDC.DASH/EVT.USER_INTERACTION_LOGGED"
    | "GDC.DASH/EVT.LOADED"
    | "GDC.DASH/EVT.SAVED"
    | "GDC.DASH/EVT.COPY_SAVED"
    | "GDC.DASH/EVT.RENAMED"
    | "GDC.DASH/EVT.RESET"
    | "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.VALIDATION.FAILED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.DATE_FILTER.SELECTION_CHANGED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.ADDED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.REMOVED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.MOVED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.PARENT_CHANGED"
    | "GDC.DASH/EVT.FILTER_CONTEXT.CHANGED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_ADDED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_MOVED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_REMOVED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.SECTION_HEADER_CHANGED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.ITEMS_ADDED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REPLACED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_MOVED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.ITEM_REMOVED"
    | "GDC.DASH/EVT.FLUID_LAYOUT.LAYOUT_CHANGED"
    | "GDC.DASH/EVT.KPI_WIDGET.HEADER_CHANGED"
    | "GDC.DASH/EVT.KPI_WIDGET.MEASURE_CHANGED"
    | "GDC.DASH/EVT.KPI_WIDGET.FILTER_SETTINGS_CHANGED"
    | "GDC.DASH/EVT.KPI_WIDGET.COMPARISON_CHANGED"
    | "GDC.DASH/EVT.KPI_WIDGET.WIDGET_CHANGED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.HEADER_CHANGED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.FILTER_SETTINGS_CHANGED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.PROPERTIES_CHANGED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.INSIGHT_SWITCHED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_MODIFIED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.DRILLS_REMOVED"
    | "GDC.DASH/EVT.INSIGHT_WIDGET.WIDGET_CHANGED"
    | "GDC.DASH/EVT.ALERT.CREATED"
    | "GDC.DASH/EVT.ALERT.UPDATED"
    | "GDC.DASH/EVT.ALERT.REMOVED"
    | "GDC.DASH/EVT.SCHEDULED_EMAIL.CREATED"
    | "GDC.DASH/EVT.DRILL.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_DOWN.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.TRIGGERED"
    | "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.TRIGGERED"
    | "GDC.DASH/EVT.DRILL_TARGETS.ADDED";
/**
 * Base type for all dashboard events.
 *
 * @alpha
 */
export interface IDashboardEvent {
    /**
     * Event type. Always starts with "GDC.DASH/EVT".
     */
    readonly type: DashboardEventType;

    /**
     * If this event was triggered as part of a command processing, then the prop will contain command's correlation ID.
     */
    readonly correlationId?: string;

    /**
     * Dashboard context in which the event occurred.
     */
    readonly ctx: DashboardContext;
}

/**
 * Tests whether object is an instance of {@link IDashboardEvent}.
 *
 * @param obj - object to test
 * @alpha
 */
export function isDashboardEvent(obj: unknown): obj is IDashboardEvent {
    return !isEmpty(obj) && (obj as IDashboardEvent).type?.startsWith("GDC.DASH/EVT");
}
