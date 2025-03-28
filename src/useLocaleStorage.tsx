// Custom Hook
// React hooklarına benzer şekilde görev yapan
// proje ihtiyacına göre kendi oluşturduğumuz
// görevini bizim belirlediğimiz hooklardır
// Genelde veriyi ve veriyi güncelleyecek fonksiyonu dizi içinde dönerler

import { useEffect, useState } from "react";

export function useLocaleStorage<T> (key:string, initialValue:T){
    //1-) state'i tanımlama
    const [value, setValue] = useState<T>(() => {
        // local'den değerleri al
        const jsonValue = localStorage.getItem(key);

        // local'de eleman yoksa initial value ile tanımla
        if(jsonValue === null) {
            return initialValue;
        } else {
        // local'de eleman varsa, lokal'deki veriyi state'e aktar
            return JSON.parse(jsonValue);
        }
    });

    //2-) state her değiştiğinde local storage'i güncelle
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    //3-) hook'un kullanılması için state'i ve değiştirme metodunu return et
    return [value, setValue] as [T, typeof setValue];
}