import _ from 'lodash';

export function paginate(items,pageNumber,pageSize){
    // for example, 2nd page startIndex = (2-1)*10 = 10
    const startIndex = (pageNumber-1)*pageSize;

    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();

}