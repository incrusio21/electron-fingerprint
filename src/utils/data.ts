import { parse, parseISO, isDate } from 'date-fns';

const DATETIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"; // Sesuaikan dengan format yang diinginkan

export function now_datetime(): Date {
    return new Date();
}

export function is_invalid_date_string(dateString: any): boolean {
    // Periksa apakah dateString bukan string
    if (typeof dateString !== 'string') {
      return true;
    }
  
    // Periksa apakah dateString kosong atau dimulai dengan "0001-01-01" atau "0000-00-00"
    return dateString === '' || dateString.startsWith("0001-01-01") || dateString.startsWith("0000-00-00");
}

export function get_datetime(datetimeStr: string | Date | number[] | null = null): Date | null {
    if (datetimeStr === null) {
        return now_datetime();
    }

    if (datetimeStr instanceof Date) {
        return datetimeStr;
    }

    if (Array.isArray(datetimeStr)) {
        // Date di JavaScript menggunakan zero-based index untuk bulan (0-11)
        // Sehingga jika arraynya adalah [year, month, day, hours, minutes, seconds]
        // Maka `month` perlu dikurangi 1
        const [year, month, day, hours = 0, minutes = 0, seconds = 0] = datetimeStr;
        return new Date(year, month - 1, day, hours, minutes, seconds);
    }

    if (isDate(datetimeStr)) {
        return datetimeStr;
    }

    if (typeof datetimeStr === 'string' && is_invalid_date_string(datetimeStr)) {
        return null;
    }

    try {
        // Coba parsing menggunakan format yang spesifik
        return parse(datetimeStr as string, DATETIME_FORMAT, new Date());
    } catch (e) {
        // Jika gagal parsing, gunakan parseISO sebagai fallback
        return parseISO(datetimeStr as string);
    }
}
