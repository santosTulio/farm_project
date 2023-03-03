from django_filters import FilterSet, filters, CharFilter

from farm_base.api.v1.filters.fields import NumberInFilter
from farm_base.models import Farm


class FarmFilter(FilterSet):
    ids = NumberInFilter(field_name='id', lookup_expr='in')
    names = CharFilter(field_name='name', lookup_expr='contains')
    states = CharFilter(field_name='state', lookup_expr='contains')
    municipalities = CharFilter(field_name='municipality', lookup_expr='contains')

    class Meta:
        model = Farm
        fields = ['ids', 'names', 'states', 'municipalities']
