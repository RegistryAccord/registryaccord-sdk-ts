/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseClient, BaseClientConfig } from './BaseClient';

// Identity Imports
import {
    AuditApi as IdentityAuditApi,
    ConsentsApi as IdentityConsentsApi,
    IdentitiesApi as IdentityIdentitiesApi,
    KeysApi as IdentityKeysApi,
    OrganizationsApi as IdentityOrganizationsApi,
    SessionsApi as IdentitySessionsApi,
    TokensApi as IdentityTokensApi,
} from '../generated/identity';

// Content Imports
import {
    CollectionsApi as ContentCollectionsApi,
    ContentApi as ContentContentApi,
    EventsApi as ContentEventsApi,
    LicensesApi as ContentLicensesApi,
    TransparencyApi as ContentTransparencyApi,
    VersionsApi as ContentVersionsApi,
} from '../generated/content';

// Storage Imports
import {
    BucketsApi as StorageBucketsApi,
    ObjectsApi as StorageObjectsApi,
    UploadsApi as StorageUploadsApi,
} from '../generated/storage';

// Payments Imports
import {
    ChargesApi as PaymentsChargesApi,
    DisputesApi as PaymentsDisputesApi,
    LedgersApi as PaymentsLedgersApi,
    PaymentIntentsApi as PaymentsPaymentIntentsApi,
    PayoutsApi as PaymentsPayoutsApi,
    SubscriptionsApi as PaymentsSubscriptionsApi,
} from '../generated/payments';

// Feeds Imports
import {
    ExperimentsApi as FeedsExperimentsApi,
    FeedsApi as FeedsFeedsApi,
    SignalsApi as FeedsSignalsApi,
} from '../generated/feeds';

// Revenue Imports
import {
    CampaignsApi as RevenueCampaignsApi,
    CreativesApi as RevenueCreativesApi,
    SegmentsApi as RevenueSegmentsApi,
    TransparencyApi as RevenueTransparencyApi,
} from '../generated/revenue';

// Analytics Imports
import {
    EventsApi as AnalyticsEventsApi,
    ExportsApi as AnalyticsExportsApi,
    MetricsApi as AnalyticsMetricsApi,
    PrivacyApi as AnalyticsPrivacyApi,
    SchemasApi as AnalyticsSchemasApi,
    TransparencyApi as AnalyticsTransparencyApi,
} from '../generated/analytics';

export interface RAClientConfig extends BaseClientConfig {
    // Add any RAClient specific config here if needed
}

/**
 * The main entry point for the RegistryAccord SDK.
 * Exposes all service APIs and handles configuration, authentication, and resilience.
 */
export class RAClient extends BaseClient {
    // ... properties ...

    /**
     * Manually update the access token used by the client.
     * This is useful if you are managing tokens externally or need to rotate them.
     * @param token - The new bearer token.
     */
    public setAccessToken(token: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export function createRAClient(config: RAClientConfig): RAClient {
    return new RAClient(config);
}
