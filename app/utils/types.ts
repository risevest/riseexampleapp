export type Status = 'success' | 'failed';

export interface PortfolioMix {
  plan_id: string;
  portfolio_share_fixed_income: number;
  portfolio_share_real_estate: number;
  portfolio_share_stocks: number;
}

export interface EventLogData {
  add_phone_number: {
    country: string;
    origin_screen_name: string;
    status: Status;
  };
  attribution_form_filled: {
    inapp_attribution_channel: string;
    is_referred: boolean;
  };
  attribution_form_opened: {};
  autoinvest_activated: {
    autoinvest_amount: string;
    autoinvest_frequency: string;
    has_autoinvest_on: boolean;
    plan_id: string;
    plan_name: string;
    plan_type: string;
  };
  autoinvest_deactivated: {
    plan_id: string;
    plan_name: string;
    plan_type: string;
  };
  begin_add_card: {
    currency: string;
    origin_screen_name: string;
  };
  begin_create_plan: {
    origin_screen_name: string;
    plan_type: string;
  };
  begin_create_vault: string;
  begin_send_gift_plan: {origin_screen_name: string};
  begin_send_manual_ID: {};
  begin_sign_up: {};
  bvn_verified: {
    reason?: string;
    status: Status;
  };
  change_pin: {status: Status};
  close_article: {
    article_title: string;
    engagement_time: string;
    origin_screen_name: string;
    scroll_percentage: string;
  };
  complete_sign_up: {is_referred: boolean; user_id: string};
  copy_item: {item_name: string; origin_screen_name: string};
  copy_referral_code: {origin_screen_name: string};
  edit_plan: {
    autoinvest_amount: string;
    autoinvest_frequency: string;
    origin_screen_name: string;
    plan_id: string;
    plan_name: string;
    plan_type: string;
    reinvest: boolean;
  };
  edit_plan_name: {
    new_plan_name: string;
    old_plan_name: string;
    origin_screen_name: string;
    plan_id: string;
    plan_type: string;
  };
  edit_portfolio_mix: PortfolioMix;
  edit_vault_duration: {};
  email_verified: {previous_screen_name: string};
  enter_ID_detail: {ID_type_selected: string};
  fill_attribution_form: {attribution_channel: string; is_referred: string};
  flip_earnings_summary: {};
  forgot_password: {};
  fund_plan: {
    amount: number;
    currency: string;
    origin_screen_name: string;
    plan_id: string;
    plan_type: string;
  };
  fund_virtual_card: {
    amount: number;
    card_balance: number;
    origin_screen_name: string;
    wallet_balance: number;
  };
  id_verification_completed: {
    id_type: string;
    status: Status;
  };
  id_verification_initiated: {
    previous_screen_name: string;
  };
  id_verification_step_completed: {
    id_country: string;
    id_country_selected: string;
    id_detail_entered: boolean;
    id_doc_submitted: boolean;
    id_doc_uploaded: boolean;
    id_type: string;
    id_type_selected: string;
  };
  lock_virtual_card: {};
  login: {
    login_method: 'email & password' | 'pin';
    origin_screen_name: string;
  };
  manual_id_verification_completed: {
    status: Status;
  };
  manual_id_verification_initiated: {};
  open_article: {};
  open_attribution_form: {};
  open_campaign_card: {
    campaign_slot: number;
    campaign_title: string;
    campaign_type: string;
    origin_screen_name: string;
  };
  open_earnings_summary: {};
  open_onboarding_series: {};
  open_personal_info: {};
  open_phone_no_verification: {};
  open_sign_up: {};
  open_splash_screen: {};
  personal_info_initiated: {};
  personal_info_updated: {};
  phone_verification_initiated: {};
  phone_verified: {};
  plan_created: {
    completed: boolean;
    duration: number;
    initiated: boolean;
    plan_id: string;
    plan_name: string;
    plan_type: string;
  };
  plan_funded: {
    active_plans: number;
    amount: number;
    plan_id: string;
    plan_type: string;
    total_plan_amount_funded: number;
  };
  plan_mature: {
    plan_id: string;
    plan_name: string;
    plan_type: string;
  };
  plan_withdrawal: {
    amount: number;
    plan_id: string;
    plan_type: string;
  };
  rating_popup: {};
  read_article_finish: {
    article_title: string;
  };
  read_notification: {
    notification_category: string;
    origin_screen_name: string;
  };
  read_terms_of_service: {duration: string; origin_screen_name: string};
  referral_code_copied: {};
  referral_link_shared: {
    share_method: 'copy' | 'share';
  };
  reinvest_toggled: {
    plan_id: string;
    plan_name: string;
    plan_type: string;
    reinvest_status: boolean;
  };
  remove_autoinvest: {origin_screen_name: string; plan_id: string};
  remove_bank_account: {origin_screen_name: string};
  remove_biometric_login: {origin_screen_name: string};
  remove_card: {origin_screen_name: string};
  request_account_statement: {origin_screen_name: string};
  request_virtual_card: {origin_screen_name: string; status: Status};
  scroll_balance_view: {balance_view: string; origin_screen_name: string};
  select_ID_country: {country_selected: string};
  select_ID_type: {ID_type_selected: string};
  set_autoinvest: {origin_screen_name: string; plan_id: string};
  set_biometric_login: {
    method: 'face_id' | 'fingerprint';
    origin_screen_name: string;
  };
  set_card_autofund: {autofund_frequency: string};
  set_next_of_kin: {origin_screen_name: string; relationship: string};
  set_password: {origin_screen_name: string};
  set_pin: {origin_screen_name: string; status: Status};
  set_plan_photo: {
    funding_status: 'funded' | 'not funded';
    origin_screen_name: string;
    plan_type: string;
    user_id: string;
  };
  set_profile_picture: {};
  set_virtual_card_autofund: {
    autofund_frequency: string;
  };
  share: {};
  share_earnings_summary: {
    local_currency_value_shown: string;
    percentage_increase_shown: string;
  };
  share_feed_article: {
    article_title: string;
    share_destination: string;
  };
  share_referral_link: {origin_screen_name: string; share_method: string};
  signup: {user_id: string};
  start_ID_verification: {previous_screen_name: string};
  submit_ID_doc: {ID_type_selected: string; status: Status};
  submit_manual_ID: {status: Status};
  submit_selfie: {
    ID_type_selected: string;
    status: Status;
  };
  toggle_push_preference: {
    notification_preference_selected: 'allow' | 'disallow';
  };
  toggle_reinvest: {reinvest_on: boolean};
  toggle_wallet_interest: {wallet_interest_on: string};
  update_personal_info: {is_referred: boolean};
  upload_ID_doc: {
    ID_type_selected: string;
    ID_upload_method: 'camera' | 'gallery';
    status: Status;
  };
  vault_creation_completed: {
    amount: number;
    lock_duration: number;
  };
  vault_creation_initiated: {};
  vault_funded: {amount: number};
  verify_email: {origin_screen_name: string; status: Status};
  verify_id: {
    id_type: string;
    origin_screen_name: string;
    verification_status: Status;
    verification_type: 'fincra' | 'KYC';
  };
  verify_phone_no: {};
  video_finish: {origin_screen_name: string};
  video_start: {origin_screen_name: string};
  watch_onboarding_video: {
    date: Date;
    duration: string;
    origin_screen_name: string;
    series_title: string;
    video_watch_percent: string;
  };
  withdraw_from_virtual_card: {
    amount: number;
    card_balance: number;
    origin_screen_name: string;
    status: Status;
    wallet_balance: number;
  };
}

export interface UserProperties {
  DOB: string;
  active_plan: string[];
  age: number;
  allow_att_tracking: boolean;
  aum: number;
  bvn_verified: boolean;
  cio_subscription_preferences: string;
  country: string;
  email_verified: boolean;
  employment_status: string;
  gender: string;
  has_autoinvest_on: boolean;
  has_bank_account: boolean;
  has_reinvest_on: boolean;
  id_proof_uploaded: boolean;
  id_upload_type: string[];
  id_verified: boolean;
  in_app_distribution: string;
  inapp_attribution_channel: string;
  is_affiliate: boolean;
  is_referred: string | boolean;
  job_sector: string;
  login_methods: string;
  marital_status: string;
  monthly_income_range: string;
  phone_number: string;
  plan_types: string[];
  push_notification_preference: 'allow' | 'disallow';
  referred_investors: number;
  referred_signups: number;
  signup_date: string;
  user_id: string;
  verification: string[];
  verification_type_done: string;
  virtual_acct_generated: boolean;
}

export interface AmplitudeEvent {
  'Article Engaged': {
    'Article Title': string;
    Closed: boolean;
    'Engagement Time': number;
    Opened: boolean;
    'Scroll Percentage': number;
  };
  'Attribution Form Filled': {
    'In-App Attribution Channel': string;
    'Is Referred': boolean;
  };
  'Attribution Form Opened': {};
  'Autoinvest Activated': {
    'Autoinvest Amount': string;
    'Autoinvest Frequency': string;
    'Plan ID': string;
    'Plan Name': string;
    'Plan Type': string;
  };
  'Autoinvest Deactivated': {
    'Plan ID': string;
    'Plan Name': string;
    'Plan Type': string;
  };
  'BVN Verified': {
    Reason: string;
    Status: Status;
  };
  'Bank Acct Added': {};
  'Campaign Card Opened': {
    'Campaign Card Slot': number;
    'Campaign Card Title': string;
    'Campaign Card Type': string;
    'Publish Date': string;
  };
  'Confirm Pin Initiated': {};
  'Earnings Summary Engaged': {
    'Card Flipped': boolean;
    'Card Opened': boolean;
  };
  'Earnings Summary Shared': {
    'Local Currency Value Shown': boolean;
    'Percentage Increase Shown': boolean;
  };
  'Feed Article Shared': {
    'Article Title': string;
    'Share Destination': string;
  };
  'Forgot Password Initiated': {};
  'Gift Plan Sent': {
    Completed: boolean;
    Initiated: boolean;
    'Plan Amount': number;
    'Plan Name': string;
    'Plan Type': string;
    'Receiver Email': string;
    'Receiver ID': string;
    'Sender ID': string;
    'Sent to Existing User': boolean;
  };
  'ID Verification Completed': {
    'ID Type': string;
    Status: Status;
  };
  'ID Verification Initiated': {'Previous Screen Name': string};
  'ID Verification Step Completed': {
    'ID Country': string;
    'ID Country Selected': boolean;
    'ID Detail Entered': boolean;
    'ID Doc Submitted': boolean;
    'ID Doc Uploaded': boolean;
    'ID Type': string;
    'ID Type Selected': boolean;
  };
  'Manual ID Verification Completed': {Status: Status};
  'Manual ID Verification Initiated': {};
  'Naira Virtual Account Initiated': {};
  'New Card Added': {
    'Card Brand': string;
    Currency: string;
  };
  'New Card Initiation': {
    'Card Brand': string;
    Currency: string;
  };
  'Notification Read': {};
  'Onboarding Series Opened': {};
  'Onboarding Video Watched': {
    'Video title': string;
    'Watch Duration': string;
  };
  'Personal Info Initiated': {};
  'Personal Info Updated': {};
  'Phone Verification Initiated': {};
  'Phone Verified': {};
  'Plan Created': {
    Completed: boolean;
    Duration: string;
    Initiated: boolean;
    'Plan ID': string;
    'Plan Name': string;
    'Plan Type': string;
  };
  'Plan Funded': {
    Amount: number;
    'Plan ID': string;
    'Plan Name': string;
    'Plan Type': string;
  };
  'Plan Name Edited': {
    'New Plan Name': string;
    'Old Plan Name': string;
    'Plan ID': string;
    'Plan Type': string;
  };
  'Push Preference Toggled': {
    'Notification Preference Selected': 'yes' | 'no';
  };
  'Referral Code Copied': {};
  'Referral Code Used': {};
  'Referral Link Shared': {
    'Share Method': string;
  };
  'Reinvest Toggled': {
    'Plan ID': string;
    'Plan Name': string;
    'Plan Type': string;
    'Reinvest Status': boolean;
  };
  'Splash Screen Opened': {};
  'Vault Creation Completed': {
    Amount: number;
    'Lock Duration': number;
  };
  'Vault Creation Initiated': {};
  'Vault Duration Edited': {};
  'Vault Funded': {
    Amount: number;
  };
  'Wallet Interest Toggled': {
    'Wallet Interest Status': boolean;
  };
  'Wallet Opened': {
    'Wallet Type Opened': 'naira' | 'dollar';
  };
  'Wallet Withdrawal Initiated': {};
}

export type ValueOf<T> = T[keyof T];

export type AmplitudeUserPropertiesType = Record<
  keyof AmplitudeUserProperties,
  string | number | boolean
>;

export interface AmplitudeUserProperties {
  Email: string;
  'Employment Status': string;
  Gender: string;
  'Has Autoinvest On': boolean;
  'In-App Attribution Channel': string;
  'Is Referred': boolean;
  'Job Sector': string;
  'Marital Status': string;
  'Monthly Income Range': string;
  'Number of Bank Accts Added': number;
  'Number of Cards on Acct': number;
  'Phone Number': string;
  'Push Notification Preference': 'yes' | 'no';
  'Verification Type Done': string;
}

export type AmplitudeEventName = keyof AmplitudeEvent;
export type EventName = keyof EventLogData;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
