
const { createClient, QueryResult, QueryData, QueryError } = require('@supabase/supabase-js');
// const supabaseUrl = ""
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)

class SupaBaseRepository {
    db_url
    db_key
    supabase

    constructor(base_url, base_key) {
        // this.supabase = createClient(base_url, base_key)
        this.db_url = base_url
        this.db_key = base_key
        // console.log(this.base_url);
    }

    // getUrl() {
    //     console.log(this.db_url);
    //     return this.db_url
    // }

    // getKey() {
    //     console.log(this.db_url);
    //     return this.db_key
    // }


    async insertDay() {
        const { data, error } = await supabase
            .from('day')
            .insert([
                { some_column: 'someValue', other_column: 'otherValue' },
            ])
            .select()
    }

    async getDay() {
        try {
            const supabase = createClient(this.db_url, this.db_key)
            let { data: day, error } = await supabase
                .from('day')
                .select('*');
            if (error) {
                console.error('Error fetching day:', error.message);
            } else {
                console.log('Fetched day:', day);
                return day
            }
        } catch (e) {
            console.error('Error:', e.message);
        }
    }
}

module.exports = SupaBaseRepository