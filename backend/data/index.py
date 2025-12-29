import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для получения информации о фитнес-клубе'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    data_type = params.get('type', 'trainers')
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if data_type == 'trainers':
            cursor.execute('SELECT * FROM trainers ORDER BY id')
            result = cursor.fetchall()
        
        elif data_type == 'subscriptions':
            cursor.execute('SELECT * FROM subscriptions ORDER BY id')
            result = cursor.fetchall()
        
        elif data_type == 'activities':
            cursor.execute('SELECT * FROM activities ORDER BY id')
            result = cursor.fetchall()
        
        elif data_type == 'schedule':
            cursor.execute('''
                SELECT 
                    s.id,
                    s.day_of_week,
                    s.time_start::text,
                    a.title as activity_title,
                    t.name as trainer_name,
                    s.max_spots
                FROM schedule s
                LEFT JOIN activities a ON s.activity_id = a.id
                LEFT JOIN trainers t ON s.trainer_id = t.id
                ORDER BY 
                    CASE s.day_of_week
                        WHEN 'Понедельник' THEN 1
                        WHEN 'Вторник' THEN 2
                        WHEN 'Среда' THEN 3
                        WHEN 'Четверг' THEN 4
                        WHEN 'Пятница' THEN 5
                        WHEN 'Суббота' THEN 6
                        WHEN 'Воскресенье' THEN 7
                    END,
                    s.time_start
            ''')
            result = cursor.fetchall()
        
        else:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid type parameter'}),
                'isBase64Encoded': False
            }
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False, default=str),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
