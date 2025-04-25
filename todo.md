* disable save/share buttons on error + badge
```js
    useEffect(() => {
        const hasErrors = Object.values(fieldErrors).some(error => error !== null);
        setBadgeVisible(hasErrors);
    }, [fieldErrors]);
```
* improve logic of profile value updates (maybe onBlur)
* Add "Create new" dialog
* Save before open new
* Improve navigation for desktop layout
* Upload zeroing
* Upload distances from file
* Upload drag-model from .drg
* Custom Icons to svg
* Improve distances editor
* Improve drag-model editor
* Add profiles library link or embed