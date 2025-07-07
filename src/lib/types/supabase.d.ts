export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			appointments: {
				Row: {
					client_id: string;
					created_at: string | null;
					date: string;
					end_time: string;
					id: string;
					lawyer_id: string;
					local_date: string | null;
					local_end_time: string | null;
					local_start_time: string | null;
					reference_id: string | null;
					sequence: number;
					start_time: string;
					status: Database['public']['Enums']['appointments_status'] | null;
					timezone: string | null;
					updated_at: string | null;
				};
				Insert: {
					client_id: string;
					created_at?: string | null;
					date: string;
					end_time: string;
					id?: string;
					lawyer_id: string;
					local_date?: string | null;
					local_end_time?: string | null;
					local_start_time?: string | null;
					reference_id?: string | null;
					sequence?: number;
					start_time: string;
					status?: Database['public']['Enums']['appointments_status'] | null;
					timezone?: string | null;
					updated_at?: string | null;
				};
				Update: {
					client_id?: string;
					created_at?: string | null;
					date?: string;
					end_time?: string;
					id?: string;
					lawyer_id?: string;
					local_date?: string | null;
					local_end_time?: string | null;
					local_start_time?: string | null;
					reference_id?: string | null;
					sequence?: number;
					start_time?: string;
					status?: Database['public']['Enums']['appointments_status'] | null;
					timezone?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'appointments_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'client';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'appointments_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			available_slots_cache: {
				Row: {
					date: string;
					end_time: string;
					id: string;
					is_available: boolean;
					last_updated: string | null;
					lawyer_id: string;
					local_date: string | null;
					local_end_time: string | null;
					local_start_time: string | null;
					slot_source_rule: string | null;
					start_time: string;
				};
				Insert: {
					date: string;
					end_time: string;
					id?: string;
					is_available?: boolean;
					last_updated?: string | null;
					lawyer_id: string;
					local_date?: string | null;
					local_end_time?: string | null;
					local_start_time?: string | null;
					slot_source_rule?: string | null;
					start_time: string;
				};
				Update: {
					date?: string;
					end_time?: string;
					id?: string;
					is_available?: boolean;
					last_updated?: string | null;
					lawyer_id?: string;
					local_date?: string | null;
					local_end_time?: string | null;
					local_start_time?: string | null;
					slot_source_rule?: string | null;
					start_time?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'available_slots_cache_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'available_slots_cache_slot_source_rule_fkey';
						columns: ['slot_source_rule'];
						isOneToOne: false;
						referencedRelation: 'lawyer_schedule_rules';
						referencedColumns: ['id'];
					}
				];
			};
			client: {
				Row: {
					created_at: string;
					email: string;
					full_name: string | null;
					id: string;
					last_name: string;
					name: string;
					phone: string;
					preferred_lang: string | null;
				};
				Insert: {
					created_at?: string;
					email: string;
					full_name?: string | null;
					id?: string;
					last_name: string;
					name: string;
					phone: string;
					preferred_lang?: string | null;
				};
				Update: {
					created_at?: string;
					email?: string;
					full_name?: string | null;
					id?: string;
					last_name?: string;
					name?: string;
					phone?: string;
					preferred_lang?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'client_preferred_lang_fkey';
						columns: ['preferred_lang'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					}
				];
			};
			language: {
				Row: {
					fr_label: string;
					id: string;
					label: string;
					value: string;
				};
				Insert: {
					fr_label: string;
					id?: string;
					label: string;
					value: string;
				};
				Update: {
					fr_label?: string;
					id?: string;
					label?: string;
					value?: string;
				};
				Relationships: [];
			};
			lawyer: {
				Row: {
					avatar_url: string | null;
					created_at: string | null;
					description: string | null;
					education: string | null;
					email: string;
					fax: string | null;
					form_completed: boolean | null;
					full_name: string;
					hourly_rate: number | null;
					id: string;
					instagram: string | null;
					last_name: string | null;
					linkedin: string | null;
					name: string;
					next_available_slot: string | null;
					phone: string | null;
					slug: string | null;
					twitter: string | null;
					website: string | null;
					weekly_search_count: number | null;
				};
				Insert: {
					avatar_url?: string | null;
					created_at?: string | null;
					description?: string | null;
					education?: string | null;
					email?: string;
					fax?: string | null;
					form_completed?: boolean | null;
					full_name: string;
					hourly_rate?: number | null;
					id: string;
					instagram?: string | null;
					last_name?: string | null;
					linkedin?: string | null;
					name: string;
					next_available_slot?: string | null;
					phone?: string | null;
					slug?: string | null;
					twitter?: string | null;
					website?: string | null;
					weekly_search_count?: number | null;
				};
				Update: {
					avatar_url?: string | null;
					created_at?: string | null;
					description?: string | null;
					education?: string | null;
					email?: string;
					fax?: string | null;
					form_completed?: boolean | null;
					full_name?: string;
					hourly_rate?: number | null;
					id?: string;
					instagram?: string | null;
					last_name?: string | null;
					linkedin?: string | null;
					name?: string;
					next_available_slot?: string | null;
					phone?: string | null;
					slug?: string | null;
					twitter?: string | null;
					website?: string | null;
					weekly_search_count?: number | null;
				};
				Relationships: [];
			};
			lawyer_address: {
				Row: {
					accessibility: string | null;
					city: string;
					id: string;
					latitude: number | null;
					lawyer_id: string;
					location_advantage: string | null;
					longitude: number | null;
					parking_availability: string | null;
					postal_code: string;
					province: string;
					street_address: string;
					suite: string | null;
				};
				Insert: {
					accessibility?: string | null;
					city: string;
					id?: string;
					latitude?: number | null;
					lawyer_id: string;
					location_advantage?: string | null;
					longitude?: number | null;
					parking_availability?: string | null;
					postal_code: string;
					province: string;
					street_address: string;
					suite?: string | null;
				};
				Update: {
					accessibility?: string | null;
					city?: string;
					id?: string;
					latitude?: number | null;
					lawyer_id?: string;
					location_advantage?: string | null;
					longitude?: number | null;
					parking_availability?: string | null;
					postal_code?: string;
					province?: string;
					street_address?: string;
					suite?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_address_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: true;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_analytics: {
				Row: {
					cancelled_appointments: number | null;
					completed_appointments: number | null;
					created_at: string | null;
					date: string;
					id: string;
					lawyer_id: string | null;
					new_connections: number | null;
					total_appointments: number | null;
				};
				Insert: {
					cancelled_appointments?: number | null;
					completed_appointments?: number | null;
					created_at?: string | null;
					date: string;
					id?: string;
					lawyer_id?: string | null;
					new_connections?: number | null;
					total_appointments?: number | null;
				};
				Update: {
					cancelled_appointments?: number | null;
					completed_appointments?: number | null;
					created_at?: string | null;
					date?: string;
					id?: string;
					lawyer_id?: string | null;
					new_connections?: number | null;
					total_appointments?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_analytics_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_client: {
				Row: {
					client_id: string;
					created_at: string | null;
					id: string;
					lawyer_id: string;
				};
				Insert: {
					client_id: string;
					created_at?: string | null;
					id?: string;
					lawyer_id: string;
				};
				Update: {
					client_id?: string;
					created_at?: string | null;
					id?: string;
					lawyer_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_client_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'client';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawyer_client_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_language: {
				Row: {
					id: string;
					language_id: string;
					lawyer_id: string;
				};
				Insert: {
					id?: string;
					language_id: string;
					lawyer_id: string;
				};
				Update: {
					id?: string;
					language_id?: string;
					lawyer_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_language_language_id_fkey';
						columns: ['language_id'];
						isOneToOne: false;
						referencedRelation: 'language';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawyer_language_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_location: {
				Row: {
					id: string;
					lawyer_id: string;
					location_id: string;
				};
				Insert: {
					id?: string;
					lawyer_id: string;
					location_id: string;
				};
				Update: {
					id?: string;
					lawyer_id?: string;
					location_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_location_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawyer_location_location_id_fkey';
						columns: ['location_id'];
						isOneToOne: false;
						referencedRelation: 'location';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_notification: {
				Row: {
					action_link: string;
					created_at: string;
					description: string;
					id: string;
					is_read: boolean;
					recipient_id: string;
					title: string;
					type: Database['public']['Enums']['notification_type'];
				};
				Insert: {
					action_link: string;
					created_at?: string;
					description: string;
					id?: string;
					is_read?: boolean;
					recipient_id?: string;
					title: string;
					type: Database['public']['Enums']['notification_type'];
				};
				Update: {
					action_link?: string;
					created_at?: string;
					description?: string;
					id?: string;
					is_read?: boolean;
					recipient_id?: string;
					title?: string;
					type?: Database['public']['Enums']['notification_type'];
				};
				Relationships: [
					{
						foreignKeyName: 'notification_recipient_id_fkey';
						columns: ['recipient_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_payment_method: {
				Row: {
					id: string;
					lawyer_id: string;
					payment_method_id: string;
				};
				Insert: {
					id?: string;
					lawyer_id: string;
					payment_method_id: string;
				};
				Update: {
					id?: string;
					lawyer_id?: string;
					payment_method_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_payment_method_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawyer_payment_method_payment_method_id_fkey';
						columns: ['payment_method_id'];
						isOneToOne: false;
						referencedRelation: 'payment_method';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_payment_option: {
				Row: {
					id: string;
					lawyer_id: string;
					payment_option_id: string;
				};
				Insert: {
					id?: string;
					lawyer_id: string;
					payment_option_id: string;
				};
				Update: {
					id?: string;
					lawyer_id?: string;
					payment_option_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_payment_option_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawyer_payment_option_payment_option_id_fkey';
						columns: ['payment_option_id'];
						isOneToOne: false;
						referencedRelation: 'payment_option';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_schedule_rules: {
				Row: {
					created_at: string | null;
					day_of_week: number | null;
					end_time: string;
					id: string;
					interval_duration: number;
					lawyer_id: string;
					rule_type: Database['public']['Enums']['rule_types'];
					specific_date: string | null;
					start_time: string;
					timezone: string;
				};
				Insert: {
					created_at?: string | null;
					day_of_week?: number | null;
					end_time: string;
					id?: string;
					interval_duration: number;
					lawyer_id: string;
					rule_type: Database['public']['Enums']['rule_types'];
					specific_date?: string | null;
					start_time: string;
					timezone?: string;
				};
				Update: {
					created_at?: string | null;
					day_of_week?: number | null;
					end_time?: string;
					id?: string;
					interval_duration?: number;
					lawyer_id?: string;
					rule_type?: Database['public']['Enums']['rule_types'];
					specific_date?: string | null;
					start_time?: string;
					timezone?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_schedule_rules_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_specialization: {
				Row: {
					id: string;
					lawyer_id: string | null;
					spec_id: string | null;
				};
				Insert: {
					id?: string;
					lawyer_id?: string | null;
					spec_id?: string | null;
				};
				Update: {
					id?: string;
					lawyer_id?: string | null;
					spec_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'lawuer_specialization_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'lawuer_specialization_spec_id_fkey';
						columns: ['spec_id'];
						isOneToOne: false;
						referencedRelation: 'specialization';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_subscription_status: {
				Row: {
					created_at: string;
					id: string;
					is_valid: boolean | null;
					lawyer_id: string | null;
					status: string | null;
					stripe_customer_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					is_valid?: boolean | null;
					lawyer_id?: string | null;
					status?: string | null;
					stripe_customer_id: string;
					updated_at: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					is_valid?: boolean | null;
					lawyer_id?: string | null;
					status?: string | null;
					stripe_customer_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_subscription_status_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_verification_code: {
				Row: {
					code: string;
					created_at: string;
					id: string;
					lawyer_id: string;
				};
				Insert: {
					code: string;
					created_at?: string;
					id?: string;
					lawyer_id: string;
				};
				Update: {
					code?: string;
					created_at?: string;
					id?: string;
					lawyer_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_verification_code_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: true;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			lawyer_visibility_stats: {
				Row: {
					date: string | null;
					id: string;
					lawyer_id: string | null;
					search_appearances: number | null;
					views: number | null;
				};
				Insert: {
					date?: string | null;
					id?: string;
					lawyer_id?: string | null;
					search_appearances?: number | null;
					views?: number | null;
				};
				Update: {
					date?: string | null;
					id?: string;
					lawyer_id?: string | null;
					search_appearances?: number | null;
					views?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'lawyer_visibility_stats_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			location: {
				Row: {
					fr_label: string;
					fr_value: string;
					id: string;
					label: string;
					latitude: number | null;
					longitude: number | null;
					parent_id: string | null;
					value: string;
				};
				Insert: {
					fr_label: string;
					fr_value: string;
					id?: string;
					label: string;
					latitude?: number | null;
					longitude?: number | null;
					parent_id?: string | null;
					value: string;
				};
				Update: {
					fr_label?: string;
					fr_value?: string;
					id?: string;
					label?: string;
					latitude?: number | null;
					longitude?: number | null;
					parent_id?: string | null;
					value?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'location_parent_id_fkey';
						columns: ['parent_id'];
						isOneToOne: false;
						referencedRelation: 'location';
						referencedColumns: ['id'];
					}
				];
			};
			off_day: {
				Row: {
					created_at: string;
					date: string;
					id: string;
					lawyer_id: string;
				};
				Insert: {
					created_at?: string;
					date: string;
					id?: string;
					lawyer_id: string;
				};
				Update: {
					created_at?: string;
					date?: string;
					id?: string;
					lawyer_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'off_day_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: false;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
			payment_method: {
				Row: {
					fr_label: string;
					icon: string | null;
					id: string;
					label: string;
					value: string;
				};
				Insert: {
					fr_label: string;
					icon?: string | null;
					id?: string;
					label: string;
					value: string;
				};
				Update: {
					fr_label?: string;
					icon?: string | null;
					id?: string;
					label?: string;
					value?: string;
				};
				Relationships: [];
			};
			payment_option: {
				Row: {
					fr_label: string;
					icon: string | null;
					id: string;
					label: string;
					value: string;
				};
				Insert: {
					fr_label: string;
					icon?: string | null;
					id?: string;
					label: string;
					value: string;
				};
				Update: {
					fr_label?: string;
					icon?: string | null;
					id?: string;
					label?: string;
					value?: string;
				};
				Relationships: [];
			};
			specialization: {
				Row: {
					fr_label: string;
					fr_value: string;
					id: string;
					label: string;
					parent_id: string | null;
					value: string;
				};
				Insert: {
					fr_label?: string;
					fr_value: string;
					id?: string;
					label: string;
					parent_id?: string | null;
					value: string;
				};
				Update: {
					fr_label?: string;
					fr_value?: string;
					id?: string;
					label?: string;
					parent_id?: string | null;
					value?: string;
				};
				Relationships: [];
			};
			user_preferences: {
				Row: {
					id: string;
					lawyer_id: string;
					meeting_duration: number;
					timezone: string | null;
				};
				Insert: {
					id?: string;
					lawyer_id: string;
					meeting_duration?: number;
					timezone?: string | null;
				};
				Update: {
					id?: string;
					lawyer_id?: string;
					meeting_duration?: number;
					timezone?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'user_preferences_lawyer_id_fkey';
						columns: ['lawyer_id'];
						isOneToOne: true;
						referencedRelation: 'lawyer';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			cron_cleanup_old_data: {
				Args: Record<PropertyKey, never>;
				Returns: boolean;
			};
			get_form_template: {
				Args: Record<PropertyKey, never>;
				Returns: Json;
			};
			increment_profile_view: {
				Args: { lawyer_identifier: string };
				Returns: undefined;
			};
			increment_search_appearances: {
				Args: { lawyer_identifiers: string[] };
				Returns: undefined;
			};
			rule_apply_slot_constraints: {
				Args: { lawyer_id_input: string };
				Returns: undefined;
			};
			rule_generate_recurring_slots_for_date: {
				Args: { lawyer_id_input: string; target_date: string };
				Returns: undefined;
			};
			rule_generate_slots_for_date: {
				Args: { lawyer_id_input: string; target_date: string };
				Returns: undefined;
			};
			rule_generate_slots_for_lawyer: {
				Args: { lawyer_id_input: string; days_ahead?: number };
				Returns: undefined;
			};
			rule_generate_slots_from_rules: {
				Args: {
					lawyer_id_input: string;
					days_ahead: number;
					lawyer_timezone: string;
				};
				Returns: undefined;
			};
			rule_get_available_lawyers_by_date: {
				Args: { target_date: string; loc_value?: string; spec_value?: string };
				Returns: {
					lawyer_id: string;
				}[];
			};
			rule_get_available_slots_day: {
				Args: { target_date: string; lawyer_ids: string[] };
				Returns: Json;
			};
			rule_get_available_slots_week: {
				Args: { start_date: string; lawyer_ids: string[] };
				Returns: Json;
			};
			rule_update_all_lawyers_slots: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
			rule_update_next_available_slot: {
				Args: { lawyer_id_input: string };
				Returns: undefined;
			};
			save_lawyer_form: {
				Args: {
					input_lawyer_id: string;
					lawyer_data: Json;
					address_data: Json;
					specializations: string[];
					locations: string[];
					payment_methods: string[];
					payment_options: string[];
					languages: string[];
				};
				Returns: undefined;
			};
			update_lawyer_analytics: {
				Args: Record<PropertyKey, never>;
				Returns: undefined;
			};
		};
		Enums: {
			appointments_status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'expired';
			notification_type: 'success' | 'error' | 'warning' | 'info';
			rule_types: 'RECURRING' | 'SPECIFIC';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {}
	},
	public: {
		Enums: {
			appointments_status: ['pending', 'confirmed', 'cancelled', 'completed', 'expired'],
			notification_type: ['success', 'error', 'warning', 'info'],
			rule_types: ['RECURRING', 'SPECIFIC']
		}
	}
} as const;
